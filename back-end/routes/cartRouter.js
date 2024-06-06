const express=require("express"); 
const cartController=require("../controllers/cartController")
const authMiddleWare=require("../middleware/auth");
const cartRouter=express.Router();
cartRouter.post("/add",authMiddleWare,cartController.addToCart);
cartRouter.post("/remove",authMiddleWare,cartController.removeFromCart)
cartRouter.post("/get",authMiddleWare,cartController.getCart)

module.exports=cartRouter;