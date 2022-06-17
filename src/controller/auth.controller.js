require("dotenv").config();
const jwt=require("jsonwebtoken")
const User=require("../models/user.module")


const newToken = (user)=>{
  //  console.log(process.env)
   return jwt.sign({user},process.env.JWT_SECRET_KEY);
}  

const register= async (req,res)=>{
try{
let user=await User.findOne({email:req.body.email}).lean().exec();

if(user){
    return res.send({message:"please try another email"})
}
user=await User.create(req.body); 

const token=newToken(user);

return res.send({user,token})
 
}catch(err){
    console.log(err.message)
}
}
const login= async(req,res)=>{
    try{
 const user=await User.findOne({email:req.body.email})
 if(!user){
    return res.send({message:"please try another email"})
}
///match

const match=user.checkPassword(req.body.password);
if(!match){
    return res.send({message:"please try another email"})
}
//token

const token=newToken(user);

return res.send({user,token})
 
    }catch(err){
        console.log(err.message)
    }
}
module.exports={login,register}