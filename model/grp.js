const mongoose=require('mongoose')
const schema2=mongoose.Schema({
Name:{
   require:true,
   type:String
},
email_id:{
  require:true,
  type:String  
},
Status:{
 type:String,
 require:true 
},
Topic:{
  type:String,
  require:true
}
})
schema2.Topic
const grpschema=new mongoose.model(schema2.Topic+"grpschema",schema2)
module.exports=grpschema
