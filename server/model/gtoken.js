const mongoose=require('mongoose')


const GTokenSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    access_token:{type:String},
    refresh_token:{type:String},
    id_token:{type:String}
   
    
})

const GToken=mongoose.model('GToken',GTokenSchema)

module.exports=GToken