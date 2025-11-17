const express = require('express');
const userRouter = require('./user')
const accountRouter = require('./account');
const router = express.Router();
 
router.use("/user",userRouter);  
router.use("/account",accountRouter)

// because we know that all the request will be coming at /api/v1/something..... so for that think as we are making a prefix here for that
// app.use("/api/v1", rootRouter);


module.exports = router;
