const userModel=require("../models/userModel");
const addToCart=async(req,res)=>{
    console.log("the user has ",req.body.userId);
    console.log("the item has ",req.body.itemId);

try{
const userData=await userModel.findById(req.body.userId);
const cartData=await userData.cartData;
if(!cartData[req.body.itemId]){
cartData[req.body.itemId]=1;
}else{
    cartData[req.body.itemId]+=1
}
await userModel.findByIdAndUpdate(req.body.userId,{cartData});
res.status(200).json({success:true,message:"added to cart"});
    } 
    catch(error){
res.status(500).json({success:false,message:"error cart"})
    }
}
 const removeFromCart=async(req,res)=>{
    console.log("the user has ", req.body.userId);
    console.log("the item has ", req.body.itemId);

    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = userData.cartData ;

        if (!cartData[req.body.itemId]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        if (cartData[req.body.itemId] > 1) {
            cartData[req.body.itemId] -= 1;
        } else {
            delete cartData[req.body.itemId];
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error("Error removing from cart:", error.message);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
 }
  const getCart=async (req,res)=>{
    console.log("the user has ", req.body.userId);

    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = userData.cartData ;

        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.error("Error getting cart:", error.message);
        res.status(500).json({ success: false, message: "Error getting cart" });
    }
 }
 module.exports={addToCart,removeFromCart,getCart};