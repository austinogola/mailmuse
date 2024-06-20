require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')
var bodyParser = require('body-parser')
const serverless=require('serverless-http')
const fs=require('fs')

const locales=require('./langs.json')


const connectDb=require('./config/db')

const app=express()
const port=process.env.PORT || 5000

var jsonParser = bodyParser.json()

// app.use(cors())
app.use(cors(
  {
  origin: ['https://app.mailmuse.site','http://127.0.0.1:3000'], // Allow only these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}
));
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//connect to mongodb
connectDb()

app.use('/generate',require('./routes/generate'))
app.use('/accounts',require('./routes/accounts'))
app.use('/oauth',require('./routes/oauth'))

app.post('/test',async(req,res)=>{
  console.log("POST RECEIVED")
  let {body}=req
  console.log(typeof body);
  console.log(body);
})



mongoose.connection.once('open',()=>{
    console.log("Connected to mongoDB")
    app.listen(port,()=>{
        console.log(`Ghostmail server running on port ${port}`);
      })
    
})

module.exports.handler=serverless(app)

// Handling Error
// process.on("unhandledRejection", err => {
//     console.log(`An error occurred: ${err.message}`)
//     app.close(() => process.exit(1))
//   })



// fs.mkdir(dir,err=>{
//     if(err){
//         console.log(err);
//     }
// })

// Object.keys(locales).forEach(name=>{
//     fs.open(`./_locales/${name}/messages.json`,'w',err=>{
//     if(err){
//         console.log(err);
//     }
// })
// })
