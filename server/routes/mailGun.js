const { Router } = require("express");
const multer = require("multer");

const mailGun = Router();
const upload = multer();

mailGun.post("/inbound", upload.any(), (req, res) => {
  const body = req.body ?? {};

  const recipient = body.recipient;
  const sender = body.sender;
  const subject = body.subject;
  const bodyPlain = body["body-plain"];

  console.log({ recipient, sender, subject });

  return res.status(200).send("ok");
});

module.exports = { mailGun: mailGun };
