Sprinkles & Crumbs Bakes

A full-stack bakery website where customers can browse menu items, book workshops and self-fun cake sessions, checkout, and submit feedback. Data is stored locally in text files for easy viewing by the admin — no database required for offline/demo use.

✨ Features
Customer-Facing

Browse menu and add items to cart.

Book Workshops or Self-Fun Cake Sessions.

Dynamic price calculation for cake sessions.

Submit feedback with rating and comments.

All customer interactions are saved in localStorage (for demo) or text files (for admin view).

Admin / Backend

View all orders/bookings and feedbacks in a single page (admin.html).

Feedbacks stored in feedbacks/feedbacks.txt for easy access.

No database required; works offline in a college environment.

🛠 Technologies Used

Frontend: HTML, CSS, Vanilla JS

Backend: Node.js, Express.js

Utilities: dotenv, CORS, fs (for feedback storage)

🚀 Installation & Setup

Clone the repository

git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>


Install dependencies

npm install


Create a .env file (optional, only if you plan to use environment variables)

PORT=5000


Run the server

node server.js


Open your browser

http://localhost:5000


Access admin dashboard

http://localhost:5000/admin.html


Admin dashboard lets you view all feedbacks and orders/bookings saved in text files.

📁 Project Structure
/project-root
│
├─ public/             # HTML, CSS, JS frontend files
│   ├─ index.html
│   ├─ cart.js
│   ├─ workshop.js
│   ├─ selffun.js
│   ├─ feedback.js
│   └─ admin.html
├─ server.js           # Node.js + Express server
├─ .env                # Environment variables
├─ package.json
└─ feedbacks/          # Feedback text files (feedbacks.txt)
