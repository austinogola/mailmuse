const router=require("express").Router()
// const formMail=require('../../../middleware/genMail')
const {formMail,newFormMail}=require('../middleware/genMail.js')
const verify=require('../middleware/token.js').verifyToken
const verifyTokenNoEmail=require('../middleware/token.js').verifyTokenNoEmail
const updateRem=require('../auth/update.js')
const tonesObject=require('../config/tones/allTones.js')
const Thread=require("../model/thread.js")
const Like=require("../model/likes.js")

const {p1}=require('../config/prompts.js')


router.post('/generate',verifyTokenNoEmail,async(req,res)=>{
    let {prompt,lang,tone,thread,convo,chosenConvo}=req.body
   
  
    let theThread
    let newThread=true

    let userId=req.user._id

    if(convo && chosenConvo.thread){
        const {thread}=chosenConvo
        let newprompt='Here is an email thread between me and someone.:\n'
        Object.keys(thread).forEach(key=>{
            newprompt+=`${key}:${thread[key]}\n\n`
        })

        prompt=newprompt + prompt
    }
    
    // console.log(convo,chosenConvo);
    if(!prompt){
        res.status(400).json({message:'invalid,missing prompt'})
    }else{
        // if(!thread){
        //     const likedEmails=await Like.find({user:userId,liked:true}).limit(5)
        //     let newprompt =''
        //     if(likedEmails && likedEmails[0]){
        //         newprompt+=`\nHere are a few emails I have approved of in the past. Be sure to copy their style and patterns:\n`
        //         likedEmails.forEach((obj,ind)=>{
        //             newprompt+=`\n${ind+1}\n.${obj.text}\n`
        //         })
        //     }

        //     prompt=newprompt+prompt
        // }
        if(lang && tone.length>1){
            const allTones=tonesObject[lang]
            let tone_instruction =allTones[tone]
            if(tone_instruction){
                prompt+=`\nFor this email,${tone_instruction}`
            }
        }
        
      
        if(!thread){
            let newMessages=[
                {"role": "user", "content": p1.request},
                {"role": "system", "content": p1.answer},
                {"role": "user", "content": prompt}
            ]
            theThread=await Thread.create({user:userId,messages:newMessages})
            
        }
        else{
            // theThread= await Thread.findOne({_id:thread})
            
            newThread=false
            theThread=await Thread.findOneAndUpdate({ _id:thread }, { 
                $push: { messages: {"role":"user","content":prompt} }
            }, { new: true } )
        }

        console.log(prompt)
        // formMail(req,res,theThread,newThread)
        newFormMail(req,res,theThread,newThread)
        updateRem(req,res)
    }  
    
})

router.post('/save',verifyTokenNoEmail,async(req,res)=>{
    let {currentThread,text,liked}=req.body
    let userId=req.user._id

    let updateType=''

    const record={
        user:userId,
        text,liked,
        threadId:currentThread

    }
    
    let alreadyExists=await Like.findOne({user:userId,threadId:currentThread})
   
    if(alreadyExists){
        console.log(alreadyExists.liked,liked)
        if(alreadyExists.liked!==liked){
            if(liked===true){

            }
            updateType+=liked?'+liked':'+unliked'
        }

        if(alreadyExists.text!==text){
            updateType+='+text'
        }
      
        const newVersion = await Like.findOneAndUpdate({user:userId,threadId:currentThread}, 
            {text,liked},{ new: true });
      
        
    }
    else{
        updateType+='+new'
        let newLike= await Like.create(record)
    }

    res.status(200).json({success:true, update:updateType})

})

module.exports=router