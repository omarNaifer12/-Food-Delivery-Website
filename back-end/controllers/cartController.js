const userModel=require("../models/userModel");
 const addToCart=async (req,res)=>{
    try{
const userData=await userModel.findById(req.body.userId);
const cartData=await userData.cartData;
if(cartData[req.body.itemId]){
    cartData[req.body.itemId]=1;
}else{
    cartData[req.body.itemId]+=1
}
await userModel.findByIdAndUpdate(req.body.userId,{cartData});
res.status(200).json({success:true,message:"added to cart"});
    } 
    catch(error){
res.status(500).json({success:false,message:"error"})
    }
}
 



 const removeFromCart=async(req,res)=>{

 }



 const getCart=async (req,res)=>{

 }
 module.exports={addToCart,removeFromCart,getCart};