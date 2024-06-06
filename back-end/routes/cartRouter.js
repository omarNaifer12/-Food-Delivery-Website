const express=require("express"); 
const cartController=require("../controllers/cartController")
const cartRouter=express.Router();
cartRouter.post("/add",cartController.addToCart);
cartRouter.post("/remove",cartController.removeFromCart)
cartRouter.post("/get",cartController.getCart)

module.exports=cartRouter;