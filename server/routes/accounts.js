const router = require("express").Router()
const auth=require('../auth/auth')
const registerAcc=auth.register
const checkAcc=auth.check
const loginAcc=auth.login
const verify=require('../middleware/token').verifyToken
const verifyTokenNoEmail=require('../middleware/token').verifyTokenNoEmail
const checkUsage=auth.checkUsage
const Thread=require('../model/thread')

const {webLogin,webRegister}=require('../auth/webAuth')

router.get('/init',async(req,res)=>{
    const {email}=req.query

    if(!email){
        res.status(400).json({message:'missing email'})
    }
    else{
        let accountPresent=await checkAcc(email)
        if(accountPresent){
            loginAcc(req,res)
        }else{
            registerAcc(req,res)
        }
        // res.status(200).json({account_status:accountPresent})
          }
})


router.post('/web/login',async(req,res)=>{
    const {email,password,oauth,saved_name}=req.body

    console.log("LOgging in with",email,password,oauth,saved_name)

    if(!email){
        return res.status(401).json({error:true,message:"No email address",type:'email'})
    }
    if(!oauth && !password){
        return res.status(401).json({error:true,message:"No password field",type:'password'})
    }
    let accountPresent=await checkAcc(email)
    if(accountPresent){
        webLogin(req,res)
    }else{
        res.status(403).json({error:true,message:"No account with this email",type:'email'})
    }
})

router.post('/web/register',async(req,res)=>{
    const {email,password,oauth,saved_name}=req.body
     console.log("REGISTERRING in with",email,password,oauth,saved_name)

    if(!email){
        return res.status(401).json({error:true,message:"No email address",type:'email'})
    }
    if(!oauth && !password){
        return res.status(401).json({error:true,message:"No password field",type:'password'})
    }

    let accountPresent=await checkAcc(email)
    if(accountPresent){
        res.status(403).json({error:true,message:"Account already exists. Login instead",type:'email'})
    }else{
        webRegister(req,res)
    }
})

router.get('/verify',verifyTokenNoEmail,async(req,res)=>{
    // checkUsage(req,res)
    res.status(200).json(req.user)
})

router.get('/config',verifyTokenNoEmail,async(req,res)=>{

    const {email,account_type,saved_name,credits}=req.user
    res.status(200).json({success:true,info:{email,account_type,saved_name,credits}})
})

router.get('/threads',verifyTokenNoEmail,async(req,res)=>{
    const {size}=req.query
    console.log(size);
    
    const {email,account_type,saved_name,credits,_id}=req.user
    let allThreads=await Thread.find({user:_id},{ __v:0}).limit(size)
    console.log(allThreads);
    res.status(200).json({success:true,threads:allThreads})
})


module.exports=router