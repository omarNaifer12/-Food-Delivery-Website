const express = require('express');
const cors=require("cors");
const connectDB=require("./config/db");
const userRouter=require("./routes/userRoute");
const foodRouter  = require('./routes/foodRoute');
const cartRouter=require("./routes/cartRouter");
const orderRouter=require("./routes/orderRoute");


const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Successful responsjje.');
});
connectDB();





app.use("/api/food",foodRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.listen(3000, () => console.log('Example app is listening on port 3000.'));