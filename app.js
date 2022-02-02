const express =require('express');
const bodyParser=require('body-parser');
const cookieparser = require("cookie-parser");
const app=express()


require("dotenv").config()
require("./connection/conn")

const port= process.env.PORT||4000


const authroutes=require('./router/routes')
app.use(bodyParser.json())
app.use(cookieparser())
app.use(authroutes)
app.use('/public',express.static('public'))

app.listen(port,()=>{
   console.log(`hey i am working on ${port}`) 
})
