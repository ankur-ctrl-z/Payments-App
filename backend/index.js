const cors = require('cors');
const express = require("express");
const rootRouter = require("./routes/index")

const app = express(); 
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.use("/api/v1",rootRouter);
app.listen(3000, function(req,res){
    console.log('server is running on ' + PORT);
}); 