 const express=require("express");
 const Product=require("../models/product.model")
 
 const router=express.Router();

const  authenticate=require("../middleware/authenticate")

//in get request we need not authentication
router.get("",async(req,res)=>{
    try{
       //  const user_id=req.user._id
    const product=await Product.find().lean().exec()
    return res.send(product)
    }catch(err){
      return  res.send(err.message)
    }
})
//////
router.post("",authenticate,async(req,res)=>{
    try{ 
         req.body.user_id=req.user._id
    const product=await Product.create(req.body);
    return res.send(product)
    }catch(err){
      return  res.send(err.message)
    }
})
router.delete("/:id",async(req,res)=>{
    try{
        //req.body.user_id=req.user._id
    const product=await Product.findByIdAndDelete(req.params._id)
    return res.send(product)
    
    }catch(err){
      return  res.send(err.message)
    }
})
 module.exports=router;