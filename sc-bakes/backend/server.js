// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(__dirname)); // serve HTML, JS, CSS, images, etc.

// Directory for storing feedbacks
const feedbacksDir = path.join(__dirname, 'feedbacks');
if (!fs.existsSync(feedbacksDir)) fs.mkdirSync(feedbacksDir, { recursive: true });
const feedbackFile = path.join(feedbacksDir, 'feedbacks.txt');

// POST feedback
app.post('/save-feedback', (req, res) => {
  const { name, date, rating, message } = req.body;

  if (!name || !date || !rating) {
    return res.status(400).json({ message: "Name, date, and rating are required" });
  }

  const feedbackText = `
========================================
Feedback Entry
========================================
Name: ${name}
Date of Visit: ${date}
Rating: ${rating}/5
Message: ${message || 'No additional comments'}
Submitted At: ${new Date().toISOString()}
========================================

`;

  fs.appendFileSync(feedbackFile, feedbackText, 'utf8');
  console.log("Feedback saved");
  res.json({ message: "Feedback saved successfully!" });
});

// GET feedbacks
app.get('/get-feedbacks', (req, res) => {
  if (!fs.existsSync(feedbackFile)) {
    return res.json({ feedbacks: [], text: 'No feedbacks yet.' });
  }

  const data = fs.readFileSync(feedbackFile, 'utf8');
  res.json({ feedbacks: data, text: data });
});

// POST checkout/cart orders
app.post('/save-checkout', (req, res) => {
  console.log("Received checkout:", req.body);
  res.json({ message: "Checkout saved (simulated)" });
});

// POST workshop booking
app.post('/save-workshop', (req, res) => {
  console.log("Received workshop booking:", req.body);
  res.json({ message: "Workshop booking saved (simulated)" });
});

// POST self-fun booking
app.post('/save-self-fun', (req, res) => {
  console.log("Received self-fun booking:", req.body);
  res.json({ message: "Self-fun booking saved (simulated)" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
