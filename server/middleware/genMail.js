
const Configuration =require("openai").Configuration
const OpenAIApi=require("openai").OpenAIApi
require('dotenv').config()
const fs = require('fs');
var Readable = require('stream').Readable
const Thread=require("../model/thread")


const configuration = new Configuration({
    apiKey:process.env.openApiKey
});

const openai = new OpenAIApi(configuration)



const formMail=async(req,res,threadObj)=>{

    // return new Promise(async(resolve,reject)=>{
        
        // let content= `Write an email ${prompt}`
        // let content= prompt

        let lan='en'


        try{
            // console.log('Attempting with prompt',content);

            let resp

            try {
                const {messages,_id}=threadObj
                resp=await openai.createChatCompletion({
                    "model":'gpt-3.5-turbo',
                    // "messages":[
                    //     {"role": "user", "content": content}
                    // ],
                    "messages":messages,
                    "stream":true
                },{responseType:'stream'})

                console.log(messages);

                let gptResponse


                resp.data.on('data', async data=>{
                    const lines=data.toString().split('\n').filter(line=>line.trim()!=='')
                    
                    for(const line of lines ){
                        
                        const msg=line.replace(/^data: /,'')
                        
                        if(msg=='[DONE]'){
                            let threading=JSON.stringify({thread:_id})
                            threading=`-----${threading}-----`
                            Thread.findOneAndUpdate({ _id:_id }, { 
                                    $push: { messages: {"role":"system","content":gptResponse} }
                                }, { new: false } 
                            ).then(upp=>{
                                console.log(upp);
                                res.write(threading)
                                return res.end()
                            })
                            

                            // res.write('STREAM COMPLETELEY FINISHED','utf8')
                        }
                        else{
                            try {
                                const parsedData = JSON.parse(msg);
                                const {choices}=parsedData
                                let delta=await choices[0].delta
                                if(delta.content){
                                    let text=delta.content
                                    gptResponse+=text
                                    res.write(text,'utf8')
                                }
                                
                              } catch (error) {
                                // res.write(`/n${error.message}`,'utf8')
                                // return res.end()
                              }
    
                            //   console.log('Stream Completelely finished');
                              
                        }
                    }
                    // res.end()
                })
                
            } catch (error) {
                console.log(Object.keys(error));
                console.log(error.response);
                console.log('Error generating');
                console.log(error.message);
                res.status(400).json({message:error.message})
            }

            
        }
        catch(err){
            console.log(err.message);
            res.status(400).json({message:err.message})
            // console.log(err.response)
        }
    // })

    
}

const sleep=(ms)=>{
    return new Promise(async(resolve, reject) => {
        setTimeout(() => {
            resolve('DONE')
        }, ms);
    })
}

// [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
// [ 'id', 'object', 'created', 'model', 'usage', 'choices' ]

module.exports=formMail