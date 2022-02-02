const mongoose= require('mongoose')


mongoose.connect("mongodb+srv://aman:atlaskicycle@cluster0.as0ic.mongodb.net/basicdata?retryWrites=true&w=majority",{ useNewUrlParser: true })
.then(()=>{
console.log("connection successful")
})
.catch((err)=>{
console.log(err)
})