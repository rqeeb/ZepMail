const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

async function connectDb() {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Mongo connected");
    })
    .catch((err) => {
      console.log("Connection error:", err);
    });
}

// Schema
const mailSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const mailModel = mongoose.model("Mail", mailSchema);

module.exports = {
  mailModel,
  connectDb,
};
