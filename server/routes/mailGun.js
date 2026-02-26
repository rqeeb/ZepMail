const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

router.post("/mailgun/inbound", async (req, res) => {
  try {
    if (req.query.secret !== process.env.INBOUND_SECRET) {
      return res.status(401).send("Unauthorized");
    }

    const to = (req.body.recipient || "").toLowerCase().trim();
    const from = (req.body.sender || "").trim();
    const subject = (req.body.subject || "").trim();
    const text = (req.body["body-plain"] || "").trim();
    const html = (req.body["body-html"] || "").trim();

    
});

module.exports = router;