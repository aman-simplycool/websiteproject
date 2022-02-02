const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const dataModel= mongoose.Schema({
 Name:{
 type:String
 },
 Email_id:{
 type:String
 },
 Password:{
 type:String
 }  
})
function generateToken(Email_id){
const token=jwt.sign({Email_id},process.env.TOKEN_KEY,{expiresIn:"2h"});
return token;
}


const schema = mongoose.model('userDetail',dataModel);
module.exports={schema,generateToken}