const express=require("express");
const multer=require("multer");
const foodController =require("../controllers/foodController");
const path=require("path");
const foodRouter=express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const uploadsPath = path.join(__dirname,'../uploads');

  const upload =multer({ storage:storage});
  foodRouter.use('/uploads', express.static(uploadsPath));
foodRouter.post("/add",upload.single("image"),foodController.addFood);
foodRouter.get("/all",foodController.getFood);
foodRouter.delete("/:id",foodController.deleteFood);
foodRouter.put("/:id",upload.single("image"),foodController.updateFood);
module.exports=foodRouter