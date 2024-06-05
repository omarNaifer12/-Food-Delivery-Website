const express=require("express"); 
const userController=require("../controllers/userController");
const  userRouter=express.Router();
userRouter.post("/registor",userController.registerUser);
userRouter.post("/login",userController.loginUser);
module.exports=userRouter;