const jwt=require('jsonwebtoken')

function authToken(req,res,next){
   const token=req.cookies.jwt;
   if(jwt.verify(token,process.env.TOKEN_KEY)==true){
next();
   }
   return res.status(400).json({"mesg":"not logged in"});
}
module.exports=authToken;