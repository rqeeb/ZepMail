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

    if (!to) return res.status(400).send("Missing recipient");

    const allowedDomain = process.env.MAIL_DOMAIN?.toLowerCase();
    if (allowedDomain && !to.endsWith("@" + allowedDomain)) {
      return res.status(403).send("Wrong domain");
    }

    const inbox = to.split("@")[0];

    await Message.create({
      inbox,
      to,
      from,
      subject,
      text,
      html,
      raw: req.body
    });

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Inbound error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;