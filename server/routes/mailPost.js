const express = require("express");
const app = express();
const mailPost = mailPost();

app.post("/post", (req, res) => {
  const tempMail = req.mail;
  const time = req.time;
  
  try {
    
  }

  //make mongo , send to db , delete if pressed refresh/after 40 mins,  
});

module.exports = {
  mailPost: mailPost,
};
