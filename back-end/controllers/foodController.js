const foodModel =require( "../models/foodModule");
const fs= require( "fs");
const path=require("path");
const foodController={
 addFood:async (req,res)=>{
let image_filename=req.file.filename;
const food = new foodModel({ name:req.body.name,
      price:req.body.price, image:image_filename,
      description:req.body.description, category:req.body.category });
try{
   
    
    await food.save();
    res.status(201).json({ success:true,message: 'Food item created successfully', food });
  } catch (error) {
    res.status(500).json({ success:false,error: error.message });
  }
},
getFood: async(req,res)=>{
    try{
    const foods = await foodModel.find();
    res.status(200).json(foods);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }
},
deleteFood: async(req,res)=>{
    try{
        const food = await foodModel.findByIdAndDelete(req.params.id);
        
        if (!food) {
            console.log("error not found");
            return res.status(404).json({ message: 'Food item not found' });
          }
            
        
        const imagePath= path.join(__dirname, '..', 'uploads', food.image);

     
        fs.unlink(imagePath,()=>{})
        res.status(200).json({ message: 'Food item deleted successfully', food });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
},
updateFood:async (req, res) => {
    try {
   
      const food = await foodModel.findById(req.params.id);
   console.log("the food is ",food);
      if (!food) {
        return res.status(404).json({ message: 'Food item not found' });
      }
  
      const name = req.body.name || food.name;
      const price = req.body.price || food.price;
      const description = req.body.description || food.description;
      const category = req.body.category || food.category;
  
      // Handle the image update
      let image=food.image;
      if (req.file){
        
        const newImage = req.file.filename;
       
        const oldImagePath = path.join(__dirname, '..', 'uploads', food.image);
  
        fs.unlink(oldImagePath,() =>{});
        
        image = newImage;
        
    }
    console.log("the imagelast",food.image);
    
    console.log("the image",image);
      const updatedFood = await foodModel.findByIdAndUpdate(req.params.id,{name:name,
        price:price,image:image,description:description,category:category 
      },
        { new: true });
  
      res.status(200).json({ message: 'Food item updated successfully', updatedFood });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
}
module.exports=foodController;