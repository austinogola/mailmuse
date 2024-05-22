const router=require("express").Router()
const {google} = require('googleapis');
const jwt_decode = require("jwt-decode");
const userHandler=require('../config/users')
const {registerNew,loginExisting,checkAccount}=userHandler 
const auth=require('../auth/auth')
const {getGoogleOAuthTokens}=auth
const checkAcc=auth.check
const GToken=require('../model/gtoken')



router.get('/google',async(req,res)=>{
    console.log((req));
    res.send('GOTTEN')
})

const port=process.env.PORT || 5000

let urlHost=`http://localhost:${port}`

router.post('/google',async(req,res)=>{
    const {code,scope}=req.body
    console.log(scope)


    //Get tokens
    let ans=await getGoogleOAuthTokens(code)
    
    if(ans.error){
        return res.status(500).json({error:true,message:"Please try again"})
    }else{
        if(scope.includes('https://www.googleapis.com/auth/userinfo.profile')){
            console.log(ans)
            const {id_token}=ans
            const googleUser=jwt_decode(id_token)
            console.log(googleUser)
            const {email,email_verified,given_name,family_name,picture}=googleUser
            const saved_name=given_name + ' ' + family_name
            let accountPresent=await checkAcc(email)
            let emParam=new URLSearchParams

            if(accountPresent){
                fetch(`${urlHost}/accounts/web/login`,{
                    method:"POST",
                    headers:{'Content-Type':"application/json"},
                    body:JSON.stringify({email,oauth:true,saved_name})
                }).then(async resppp=>{
                    let resp= await resppp.json()
                    console.log(resp)
                    res.status(200).json(resp)
                })
            }else{
                fetch(`${urlHost}/accounts/web/register`,{
                    method:"POST",
                    headers:{'Content-Type':"application/json"},
                    body:JSON.stringify({email,oauth:true,saved_name})
                }).then(async resppp=>{
                    let resp= await resppp.json()
                    res.status(200).json(resp)
                })
            }
        } else{
            console.log(ans)
        }  
        
        
    }
    
})

router.post("/",async(req,res)=>{
    let {credential}=req.body
    let decoded = jwt_decode(credential);
    let client_name=decoded.name
    let client_email=decoded.email

    let exists=await checkAccount(client_email,client_name)
    let jwtToken
    console.log(exists)
    if(exists){
        jwtToken=await loginExisting(client_email,client_name)
    }
    else{
        jwtToken=await registerNew(client_email,client_name)
    }
    console.log(jwtToken)
    const maxAge = 3 * 60 * 60;
    res.cookie('ghostToken',jwtToken,{
                    httpOnly:true,
                    maxAge:maxAge*1000
                })
    // let { tokens } = await oauth2Client.currentUser.get(credential)
    // let tok=await oauth2Client.getToken(credential)
    // console.log(tokens)
    res.status(200).json({cookie:jwtToken,maxAge:maxAge*1000})
})

router.get("/",async(req,res)=>{
    res.send('You are verified')
    console.log(req.body);
    console.log(req);
})




module.exports=router