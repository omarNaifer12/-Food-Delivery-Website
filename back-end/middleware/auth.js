const jwt=require("jsonwebtoken");
const authMiddleWare=async(req,res,next)=>{
    const {token}=req.headers;
    try{
    if(!token){
        res.status(500).json({success:false ,message:"not authorized login again"});
    }
   
const token_decode=jwt.verify(token,process.env.JWT_SECRET);
req.body.userId=token_decode.id;
next();
    }
    catch(error){
res.status(500).json({success:false, message:"error"});
    }
}
module.exports={authMiddleWare}