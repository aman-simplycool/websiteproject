const bcrypt = require('bcrypt')

 function generateHash(password){
const salt= bcrypt.genSaltSync(12)
const hash=bcrypt.hashSync(password,salt);
return hash;
}

 function comepareHash(password,hashed){
   return bcrypt.compareSync(password,hashed); 
}
module.exports={generateHash,comepareHash}