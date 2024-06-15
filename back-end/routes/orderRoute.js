const express=require("express"); 
const orderController=require("../controllers/orderController");
const authMiddleWare=require("../middleware/auth");
const orderRouter=express.Router();
orderRouter.post("/place",authMiddleWare,orderController.placeOrder);
orderRouter.post("/verify",orderController.verifyOrder);
orderRouter.post("/userorder",authMiddleWare,orderController.userOrder)
orderRouter.get("/listorder",orderController.listOrder)
orderRouter.post("/status",orderController.updateStatus)
module.exports=orderRouter;