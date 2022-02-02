const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authToken = require("../middleware/authenticate");
const { generateToken, schema } = require("../model/schema1");
const { generateHash, comepareHash } = require("../util/hash");
const grpschema=require('../model/grp')
/////////register route////////////////
router.post("/register", async (req, res) => {
  try {
    const { Name, Email_id, Password } = req.body;

    if (!Name || !Email_id || !Password) {
      return res.status(400).send("fill all four details properly");
    }

    const data = await schema.findOne({ Email_id });
    if (data) {
      return res.status(400).send("person already registered");
    }

    const hashedpassword = generateHash(Password);

    const user = new schema(req.body);
    user.Password = hashedpassword;
    await user.save();
    console.log(user);

    return res.status(200).json({ msg: "sucessful registration" });
  } catch (err) {
    console.log(err);
    return res.status(401).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { Email_id, Password } = req.body;

    if (!Email_id || !Password) {
      return res.status(400).json({ error: "Email and password don't match" });
    }

    const userData = await schema.findOne({ Email_id });
    console.log(userData)
    if (!userData) {
      return res.status(400).json({ err: "please register yourself" });
    }
    if (comepareHash(Password, userData.Password)) {
      const token = jwt.sign(userData.Name, process.env.TOKEN_KEY);

      console.log(token);

      res.cookie("jwt", token,{maxAge:'100000',httpOnly:true});
      
      return res.status(200).json({ message: "user login successful" });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ err });
  }
});
router.get('/test',authToken,async(req,res)=>{
console.log("hwllo i am authenticated")
return res.status(200).send("hello")
})

router.post('/creategroup',authToken,async(req,res)=>{
  try{
   const {Name,Email_id,Status,Topic}=req.body;
   if(!Name||!Email_id||!Status||!Topic){
    return res.status(400).json({err:"please give all the 4 details"}) 
   }
    const user= new  grpschema(req.body)
    await user.save()
    return res.status(200).json({"msg":"group has been created successfully"})   
  }
  catch(err){
    console.log(err)
   return res.status(400).json({"err":"some err occured"})
  }
 

})
module.exports = router;
