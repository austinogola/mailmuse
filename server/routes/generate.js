const router=require("express").Router()
// const formMail=require('../../../middleware/genMail')
const formMail=require('../middleware/genMail')
const verify=require('../middleware/token').verifyToken
const verifyTokenNoEmail=require('../middleware/token').verifyTokenNoEmail
const updateRem=require('../auth/update')
const tonesObject=require('../config/tones/allTones')
const Thread=require("../model/thread")


router.post('/mail',verifyTokenNoEmail,async(req,res)=>{
    let {prompt,lang,tone,thread}=req.body

    console.log(req.user);
  
    let theThread
    
    if(prompt){
        if(lang && tone.length>1){
            const allTones=tonesObject[lang]
            let tone_instruction =allTones[tone]
            if(tone_instruction){
                prompt+=`\n${tone_instruction}`
            }
        }
        if(!thread){
            let userId=req.user._id
            console.log('Making thread',userId);
            theThread=await Thread.create({user:userId,messages:[{"role": "user", "content": prompt}]})
            
        }
        else{
            // theThread= await Thread.findOne({_id:thread})
            theThread=await Thread.findOneAndUpdate({ _id:thread }, { 
                $push: { messages: {"role":"user","content":prompt} }
            }, { new: true } )
        }
        console.log('HERE NOW');
        formMail(req,res,theThread)
        updateRem(req,res)
    }else{
        console.log('Missing prompt');
        res.status(400).json({message:'invalid,missing prompt'})
    }  
    
})



module.exports=router