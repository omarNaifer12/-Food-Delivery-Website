const express=require("express");
const multer=require("multer");
const foodController =require("../controllers/foodController")
const foodRouter=express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });


foodRouter.post("/add",upload.single("image"),foodController.addFood);
foodRouter.get("/all",foodController.getFood);
module.exports=foodRouter