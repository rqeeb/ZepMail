require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { connectDB } = require("./db");
const Message = require("./models/Message");

const inboxRoutes = require("./routes/inbox");
const mailgunRoutes = require("./routes/mailgun");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/", mailgunRoutes);
app.use("/api", inboxRoutes);

async function boot() {
  await connectDB(process.env.MONGO_URI);

  const ttlMinutes = Number(process.env.MAIL_TTL_MINUTES || 40);
  const ttlSeconds = Math.max(60, ttlMinutes * 60);

  await Message.collection.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: ttlSeconds }
  );

  const PORT = process.env.PORT || 2022;

  app.listen(PORT, () => {
    console.log(`Server started!`);
  });
}

boot().catch((err) => {
  console.error("Boot error:", err);
  process.exit(1);
});