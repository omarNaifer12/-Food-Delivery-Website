const foodModel =require( "../models/foodModule");
const fs= require( "fs");
const foodController={
 addFood:async (req,res)=>{
let image_filename=req.file.filename;

const food = new foodModel({ name:req.body.name,
     price:req.body.price, image:image_filename,
      description:req.body.description, category:req.body.category });
try {
   
    
    await food.save();
    res.status(201).json({ success:true,message: 'Food item created successfully', food });
  } catch (error) {
    res.status(500).json({ success:false,error: error.message });
  }
},
getFood: async(req,res)=>{
    try {
        const foods = await foodModel.find();
        res.status(200).json(foods);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
}
module.exports=foodController;