const cors = require('cors');

const express = require("express");
const rootRouter = require("./routes/index")

const app = express();
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.use("/api/v1",rootRouter);
app.listen(3000, function(req,res){
    console.log('server is running on 3000');
}); 