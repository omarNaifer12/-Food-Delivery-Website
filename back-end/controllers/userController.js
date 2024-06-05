const userModel=require("../models/userModel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const validator =require("validator");
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}
const loginUser=async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log("the pass is",password);
    console.log("the email is",email)
    try {
        const user = await userModel.findOne({ email }); // Corrected query to search by email
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }
        const token = createToken(user._id);
        return res.status(200).json({ message: 'Login successful', success: true, token });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const registerUser=async(req,res)=>{
const password=req.body.password;
console.log("password",password);
console.log("email",req.body.email);
console.log("name",req.body.name);

    try{

    if(!validator.isEmail(req.body.email)){
    res.status(500).json({ success:false,error:"error email not valid"});
}
console.log("eneter ");
if(password<8){
    res.status(500).json({ success:false,error: "please enter strong password" });
}
const salt=await bcrypt.genSalt(10);
const hashPassword=await bcrypt.hash(password,salt);
const newUser=new userModel({
    name:req.body.name,
    email:req.body.email,
    password:hashPassword
})
const user =await newUser.save();
const token= createToken(user._id);
console.log("the token is",token);
res.status(200).json({ message: 'user added success', success:true,token });
}
catch(error) {
    res.status(500).json({ success:false,error:error});
}
}
module.exports={registerUser,loginUser};