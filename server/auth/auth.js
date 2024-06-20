const Account=require('../model/account')
const User=require('../model/user')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const register=async(req,res,next)=>{

    return new Promise((resolve,reject)=>{
        const {email}=req.query
        try{
            Account.create({email})
            .then(account=>{
                let today=new Date()
                let todayString=`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
                
                const maxAge = 24* 10 * 60 * 60;
                const {chrome_id,email}=account
                let userObject={
                    email,
                    account_type:'free',
                    saved_name:'',
                    saved_title:'',
                    to_use:'',
                    credits:100,
                    usage:[]
                }
            
                User.create(userObject)
                const accountId=account._id
                const token=jwt.sign(
                    {accountId,email},
                    process.env.jwtSecret,
                    {
                        expiresIn:maxAge
                    }
                )
                // res.cookie('ghostToken',token,{
                //     httpOnly:true,
                //     maxAge:maxAge*1000
                // })
                res.status(200).json({
                    message:'account successfully added',
                    account,
                    ghostToken:token
                })
            })
        }
        catch(err){
            res.status(401).json({
                message: "User not successfully created",
                error: err.message,
              })
        }
    })
    
}

const login=async(req,res,next)=>{
    console.log('Logging in');
    const {email}=req.query

    try{

        let theAccount=await Account.findOne({email})
        let accountId=theAccount._id
        const maxAge = 24 *15 * 60 * 60;

        const token=await jwt.sign(
            {accountId,email},
            process.env.jwtSecret,
            {
                expiresIn:maxAge
            }
        )

        // res.cookie('ghostToken',token,{
        //     httpOnly:true,
        //     maxAge:maxAge*1000
        // })
        res.status(200).json({
            massage:'User successfully logged in',
            user:{email},
            ghostToken:token
        })

    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

const check=async(email)=>{
    return new Promise(async(resolve,reject)=>{
        const em_acnt=await Account.findOne({email})

        if(em_acnt){
            console.log('Email id found')
            resolve (true)
        }
        else{
            resolve (false)
        }
    })
    
}

const checkUsage=async(req,res)=>{
    const {email}=req.query


    try{
        User.findOne({email})
        .then(resp=>{
            const {credits,account_type}=resp
            console.log(credits,(credits>0))
            res.status(200).json({
                    type:account_type,
                    allow:(credits>0)
                })
    
        })
        .catch(err=>{
            res.status(400).json({
                message:'error verifying user stats',
                error:err.message
            })
        })
    }
    catch(err){
        res.status(400).json({
            message:'error verifying user stats',
            error:err.message
        })
    }
}


let WEB_HOST=`http://127.0.0.1:3000`

const getGoogleOAuthTokens=(code,webHost)=>{
    // console.log(webHost)
    const url='https://oauth2.googleapis.com/token'
    const vals={
        client_id:process.env.g_client_id,
        client_secret:process.env.g_client_secret,
        redirect_uri:`${webHost}/oauth-google`,
        grant_type:"authorization_code",
        code
    }

    return new Promise(async(resolve,reject)=>{
            fetch(url,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(vals)
            })
            .then(async res=>{
                let resp=await res.json()
                console.log(resp)
                const {access_token}=resp
                if(access_token){
                    const {access_token,refresh_token,scope,token_type,id_token}=resp
                    resolve({access_token,refresh_token,scope,token_type,id_token,success:true})
                }else{
                    resolve({error:true})
                }
    
            })
        
    })
    
}




module.exports={register,check,login,checkUsage,getGoogleOAuthTokens}