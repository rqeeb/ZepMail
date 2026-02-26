const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    inbox: { type: String, required: true, index: true },
    to: { type: String, required: true },
    from: { type: String, default: "" },
    subject: { type: String, default: "" },
    text: { type: String, default: "" },
    html: { type: String, default: "" },
    raw: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);