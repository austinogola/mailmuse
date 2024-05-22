const Account=require('../model/account')
const User=require('../model/user')
const jwt=require('jsonwebtoken')
const verify=require('../middleware/token')
require('dotenv').config()

const updateRem=async(req,res)=>{
    console.log('Updating now')
    const {email}=req.user
    let {prompt}=req.body

    const em_acnt=await User.findOne({email})
    console.log("The account",em_acnt)
    let credits=em_acnt.credits
    
    let newCredits=credits-1

    let doc = await User.findOneAndUpdate({email}, {credits:newCredits});


}

module.exports=updateRem