// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
PORT = process.env.PORT || 2022;

const { mailGun } = require("./routes/mailGun.js");
const { mailPost } = require("./routes/mailPost.js");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/mailgun", mailGun);
app.use("/api/v1/mailPost", mailPost);

app.get("/health", (req, res) => {
  res.json({
    ok: true,
  });
});

app.listen(PORT, () => {
  console.log("it's running!");
});
