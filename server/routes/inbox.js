const express = require("express");
const Message = require("../models/message");

const router = express.Router();

router.get("/inbox/:inbox/messages", async (req, res) => {
  try {
    const inbox = req.params.inbox.toLowerCase();

    const messages = await Message.find({ inbox })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    res.json({ ok: true, messages });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

router.delete("/inbox/:inbox/messages", async (req, res) => {
  try {
    const inbox = req.params.inbox.toLowerCase();
    const result = await Message.deleteMany({ inbox });

    res.json({ ok: true, deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;