const express = require("express");
const app = express();
const mailPost = express.Router();
const mailModel = require("../db");

mailPost.post("/post", (req, res) => {
  const email = req.email;
  const time = req.time;
  
  try {
    await mailModel.create({
      email:email,
      time:time,
    })
    .then(() => {
      console.log("111");
    })
  }
  catch(err){
    console.log(`Error: ${err}`);
  }

 

  //make mongo , send to db , delete if pressed refresh/after 40 mins,  
});

module.exports = {
  mailPost: mailPost,
};
