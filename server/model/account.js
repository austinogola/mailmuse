const mongoose=require('mongoose')

const AccountSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },           
    account_type:{
        type:String,
        default:'free'
    },
    web_password:{
        type:String
    }
    
})

const Account=mongoose.model('Account',AccountSchema)

module.exports=Account