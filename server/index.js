require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
PORT = process.env.PORT || 2022;
const { mailRouter } = require("./routes/mail");

app.use(cors());
app.use(express.json());
app.use("/api/v1/", mailRouter);

app.get("/health",(req,res) =>{
  res.json({
    ok: true,
  });
});

app.listen(PORT, () => {
  console.log("it's running!");
});
