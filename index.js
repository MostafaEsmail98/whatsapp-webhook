const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// ✅ Verification endpoint (Meta يستعمله مرة واحدة للتحقق)
app.get("/webhook", (req, res) => {
  const verifyToken = "MY_VERIFY_TOKEN"; // اختار أي كلمة سر
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === verifyToken) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ استقبال الرسائل من واتساب
app.post("/webhook", (req, res) => {
  console.log("📩 Received message:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
