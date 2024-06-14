const orderModeml=require("../models/orderModels");
const userModel = require("../models/userModel");
require("dotenv").config();
const Stripe=require("stripe");
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder=async(req,res)=>{
    const frontend_url="http://localhost:5173";
try{
const newOrder=new orderModeml({
    userId:req.body.userId,
    amount:req.body.amount,
    items:req.body.items,
    address:req.body.address,
    
})
await newOrder.save();
console.log("is saived good",newOrder);
await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
const line_items=req.body.items.map((item)=>({
    price_data:{
        currency:"inr",
        product_data:{
            name:item.name
        },
        unit_amount:item.price*100*80,
    },
    quantity:item.quantity
}))
line_items.push({
    price_data:{
        currency:"inr",
    product_data:{
        name:"Delivery Charges"
    },
    unit_amount:2*100*80
    },
    quantity:1
})
console.log("lineitems is good",line_items);
const session=await stripe.checkout.sessions.create({
    line_items:line_items,
    mode:"payment",
    success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
   
})
console.log("session is ",session.url);
res.json({success:true,session_url:session.url});
}
catch(error){
console.log(error);
res.status(400).json( {success:false,error});
}
}
const verifyOrder=async(req,res)=>{
const {orderId,success}=req.body;
try{
if(success==="true"){
    await orderModeml.findByIdAndUpdate(orderId,{payement:true});
    console.log("order is",orderId,"success is",success);
    res.status(200).json({success:true,message:"paid"});
}
else{
    await orderModeml.findByIdAndDelete(orderId);
    console.log("delete order is",orderId,"success is",success);

    res.status(201).json({success:false,message:"not paid"});
}
}
catch(error){
console.log(error);
res.status(500).json({success:false,message:"error"});

}
}
const userOrder= async(req,res)=>{
try{
const orders=await orderModeml.find({userId:req.body.userId0});
res.status(200).json({success:true,data:orders});
}
catch(error){
    console.log(error);
    res.status(500).json({success:false,message:"error"})
}
}
module.exports={placeOrder,verifyOrder,userOrder};