const jwt=require('jsonwebtoken')
require('dotenv').config()
const User=require('../model/user')


const verifyTokenNoEmail=(req,res,next)=>{
    const token=req.headers.authorization
    jwt.verify(token,process.env.jwtSecret,async(err,acc)=>{
        if(err){
           return res.status(401).json({message:"Not authorized",error:true}) 
       }else{
            if(acc){
                let user=await User.findOne({email:acc.email},{ __v:0})
                req.user=user
                next()
            }else{
               return res.status(401).json({message:"Not authorized",error:true})  
            }
       }
    })
}
const verifyToken=(req,res,next)=>{
    const {email}=req.query
    const token=req.headers.authorization


    if(token){
        console.log('Token found');
        jwt.verify(token,process.env.jwtSecret,(err,user)=>{
            if(err){
                return res.status(401).json({message:"Not authorized"})
            }else{
                if(user){
                    if(user.email==email){
                        console.log('User is verified');
                        next()
                    }
                    else{
                        return res.status(401).json({message:"Not authorized"}) 
                    }
                }
                else{
                    return res.status(401).json({message:"Not authorized"}) 
                }
                
            }
        })

    }
    else{
        console.log('Missing token');
        return res.status(401).json({message:'Not authorized. Missing token'})
    }
}

module.exports={verifyToken,verifyTokenNoEmail}