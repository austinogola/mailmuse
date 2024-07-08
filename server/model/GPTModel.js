const mongoose=require('mongoose')

const GPTModelSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    messages:{
        type:Array,
        default: [
            {
                "role": "system", 
                "content": `You are a personal assistant. 
                    Your tasks include drafting emails for a user and giving them insights on my previous email conversations.
                    If asked to draft an email, you must try to the best of your ability to sound like the user by coping their writing style, common expressions and tone.`
            }, 
            {
                "role": "assistant", 
                "content": "Understood! I will do my best to mimic the style and tone of the user whenever they give me an email draft request. Please provide me with the necessary information and examples of past emails so I accurately replicate their writing style"
            }
        ] 
      }
    
})


const GPTModel=mongoose.model('GPTModel',GPTModelSchema)

module.exports=GPTModel