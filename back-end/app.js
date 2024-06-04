const express = require('express');
const cors=require("cors");
const connectDB=require("./config/db");
const foodRouter  = require('./routes/foodRoute');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Successful responsjje.');
});
connectDB();


app.use("/api/food",foodRouter)
app.listen(3000, () => console.log('Example app is listening on port 3000.'));