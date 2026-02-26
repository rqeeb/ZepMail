# ZepMail

ZepMail is a simple temporary email service built with React, Node.js, MongoDB, and Mailgun.

It lets you generate a random disposable email instantly and receive real emails without signing up.

---

## ✨ Features

- Generate random temp inboxes
- Receive real emails via Mailgun webhook
- Messages stored in MongoDB
- Auto refresh every ~7 seconds

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- Custom CSS

Backend:
- Node.js
- Express
- MongoDB (Mongoose)
- Mailgun (incoming email webhook)

---

##  Run Locally

### Backend

```bash
cd server
npm install
npm start
```

Create a `.env` file inside `/server`:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
MAILGUN_SIGNING_KEY=your_mailgun_key
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📬 How It Works

1. A random email like `abc123@mails.zepmail.xyz` is generated.
2. Mailgun receives incoming email.
3. Mailgun forwards it to the backend webhook.
4. Backend stores the message in MongoDB.
5. Frontend fetches and displays the inbox.

---

## ToDo

- Auto-delete emails after a few hours
- Real-time updates (WebSockets)
- Attachment support
- Rate limiting
