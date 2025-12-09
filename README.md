# s-c_bakes
Sprinkles & Crumbs Bakes

Sprinkles & Crumbs Bakes is a full-stack bakery website allowing customers to:

Browse menu items and add them to the cart.

Book workshops and self-fun cake sessions.

Checkout securely with all orders stored in a MongoDB database.

Submit feedback for completed orders.

This project uses HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB Atlas.

Features
Customer-Facing Features

View bakery menu items.

Add items to cart and checkout.

Book Workshops and Self-Fun Cake Sessions.

View price breakdown dynamically.

Submit feedback for their experience.

Admin/Backend Features

Store all orders and bookings in MongoDB Atlas.

Export all data to Excel (.xlsx) for record-keeping.

Server handles different types of bookings: checkout, workshop, self-fun.

Feedback stored safely in text files for quick access.

Technologies Used

Frontend: HTML, CSS, Vanilla JS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Data Export: XLSX library for Excel generation

Other: CORS, dotenv for environment variables

Installation & Setup

Clone the repository:

git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>


Install dependencies:

npm install


Create a .env file in the project root:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000


Run the server:

node server.js


Open your browser at:

http://localhost:5000

Project Structure
/project-root
│
├── public/          # Frontend HTML, CSS, JS
├── server.js        # Node.js server handling API requests
├── .env             # Environment variables (MongoDB URI, Port)
├── package.json     # Node dependencies
├── feedbacks/       # Feedback stored as text files
└── README.md

Usage

Frontend: Browse the website, add items to cart, book sessions, and submit feedback.

Backend: All orders and bookings are stored in MongoDB Atlas. Admins can export data to Excel using the /export-data endpoint.

Security

MongoDB credentials are stored in .env and are ignored by Git using .gitignore.

No sensitive information is committed to the repository.
