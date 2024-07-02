const mongoose=require('mongoose')


const LikeSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    liked:{type:Boolean,default:true},
    text:{type:String,required: true },
    threadId:{type:String,required:true}
   
    
})

const Like=mongoose.model('Like',LikeSchema)

module.exports=Like