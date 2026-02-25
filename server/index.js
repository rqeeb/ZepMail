// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
PORT = process.env.PORT || 2022;

const { mailGun } = require("./routes/mailGun.js");
const { mailPost } = require("./routes/mailPost.js");
const { connectDb } = require("./db.js");
connectDb();

app.use(
  cors({
    origin: [
      "https://zepmail.xyz",
      "https://www.zepmail.xyz",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
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

// "/clear" deletes mail.
// "/post"  Posts the mail
// "/mail"  gets new mails(mailgun)
