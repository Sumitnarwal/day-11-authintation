const express=require("express");
const  connect  = require("./configs/db");
const app=express();
app.use(express.json())
const productController=require("./controller/product.controller")
const userController=require("./controller/user.controller")
const {login,register}=require("./controller/auth.controller")



app.use("/users",userController)


app.post("/register",register)
app.post("/login",login)
app.use("/product",productController);



app.listen(7008,async ()=>{
    try{
        await connect();
        console.log("listing on port 7008")
    }catch(err){
        console.log(err.message);
    }
   
})