const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },

    account_type:{
        type:String,
        default:'free'
    },
    saved_name:{
        type:String,
    },
    saved_title:{
        type:String
    },
    to_use:{
        type:String
    },
    credits:{
        type:Number,default:250
    },
    usage:{
        type:Array,
        default: [] 
      }
    
})

const usageObj={
    timestamp:198419419048190,
    query:'string',
    answer:''
}

const User=mongoose.model('User',UserSchema)

module.exports=User