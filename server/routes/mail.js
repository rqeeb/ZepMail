const { Router } = require("express");
const mailRouter = Router();

mailRouter.get("/mail", (req, res) => {
  const locMail = req.mail;
  //Add expire in schema - mongo!

  //mail gun thingy!
  return res.json({ message: "test sucess!" });
});

module.exports = {
  mailRouter: mailRouter,
};
