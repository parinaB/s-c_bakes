# 🍰 Sprinkles & Crumbs Bakes

A full-stack bakery website where customers can browse menu items, book workshops and self-fun cake sessions, checkout securely, and submit feedback — all powered by **Node.js**, **Express**, and **MongoDB Atlas**.  

---

## ✨ Features

### Customer-Facing
- Browse menu and add items to cart.  
- Book **Workshops** or **Self-Fun Cake Sessions**.  
- Dynamic price calculation for cake sessions.  
- Submit feedback with rating and comments.  

### Admin / Backend
- All orders and bookings stored securely in **MongoDB Atlas**.  
- Export all data to Excel (`.xlsx`) for records.  
- Handles multiple booking types: **checkout**, **workshop**, **self-fun**.  
- Feedback saved in text files for easy access.  

---

## 🛠 Technologies Used
- **Frontend:** HTML, CSS, Vanilla JS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Utilities:** XLSX (Excel export), dotenv, CORS  

---

## 🚀 Installation & Setup

1. **Clone the repository**
   
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2.Install dependencies
npm install

3.Create a .env file in the root folder and add your MongoDB URI:
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

4.Run the server
node server.js

5.Open your browser
http://localhost:5000


📁 Project Structure

/project-root
│
├─ public/            # HTML, CSS, JS frontend files
├─ server.js          # Node.js + Express server
├─ .env               # Environment variables
├─ package.json
├─ feedbacks/         # Feedback text files
└─ bookings.csv       # Optional CSV backup

📌 Notes
Ensure you are connected to the internet to interact with MongoDB Atlas.

Use .env to keep your credentials safe and avoid exposing credentials in GitHub.

Feedbacks are also stored locally in feedbacks/feedbacks.txt.
