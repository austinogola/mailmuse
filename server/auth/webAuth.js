const Account=require('../model/account')
const User=require('../model/user')
const GPTModel=require('../model/GPTModel')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');

const webRegister=async(req,res,next)=>{
	return new Promise(async(resolve,reject)=>{
		const {email,password,oauth,saved_name}=req.body

		let hashedPassword
		if(password){
			hashedPassword = await bcrypt.hash(password, 10);
		}

		let accObj=oauth?{email}:{email,web_password:hashedPassword,account_type:'free'}


		const maxAge = 10*24 * 60 * 60;;

		Account.create(accObj).then(account=>{
			let userObj={
				email,
				account_type:'free',
				saved_name,
				saved_title:'',
				to_use:'',
				credits:250,
				usage:[]
                }

			const accountId=account._id

            User.create(userObj).then(usr=>{
            	

				GPTModel.create({user:usr._id}).then(mdl=>{
					console.log(mdl)
					const token=jwt.sign(
						{accountId,email},
						process.env.jwtSecret,
						{
							expiresIn:maxAge
						}
					)

					res.status(200).json({
						message:'account successfully added',
						ghostToken:token
					})
				})

               

            	// resolve({success:true,account})
            })
		})
	})
}

const webLogin=async(req,res,next)=>{

	return new Promise(async(resolve,reject)=>{
		const maxAge = 10*24 * 60 * 60;
		const {email,password,oauth}=req.body
		const theAccount=await Account.findOne({email})

		if(password){
			if(theAccount.web_password){
					const match = await bcrypt.compare(password, theAccount.web_password);
				if(!match){
					return res.status(403).json({error:true,message:'Incorrect credentials',type:'both'})
				}
			}else{
				let hashedPassword=await bcrypt.hash(password, 10);
				await Account.findOneAndUpdate({email:email},{web_password:hashedPassword})
			}
			
		}

		const accountId=theAccount._id
		const token=jwt.sign({accountId,email},
                    process.env.jwtSecret,
                    {
                        expiresIn:maxAge
                    })

		res.status(200).json({
	        message:'account logged in successfully',
	        ghostToken:token
    	})

	})

}

module.exports={webLogin,webRegister}
