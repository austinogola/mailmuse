const mongoose=require('mongoose')


const ThreadSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages:{
        type:Array,
        default: [] 
    }
   
    
})

const Thread=mongoose.model('Thread',ThreadSchema)

module.exports=Thread