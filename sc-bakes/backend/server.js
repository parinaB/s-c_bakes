

// Load environment variables first
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();

// MONGODB ATLAS CONNECTION
const mongoURI = process.env.MONGO_URI || "mongodb+srv://1ds24cs139_db_user:MygELg8rurgJp2sa@cakebookings.dqegdmv.mongodb.net/CakeBooking?retryWrites=true&w=majority&appName=CakeBookings";

if (!process.env.MONGO_URI) {
  console.warn("⚠️  Warning: MONGO_URI not found in .env file. Using fallback connection string.");
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    console.log("Database:", mongoose.connection.name);
    console.log("Connection state:", mongoose.connection.readyState);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.error("Error details:", err.message);
  });


// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected successfully');
});

app.use(express.json());
app.use(cors());

// Schema for all orders/bookings
const orderSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'checkout', 'workshop', 'self-fun'
  items: Array,      // For checkout: array of cart items
  total: Number,     // Total amount
  // Workshop/Self-fun fields
  name: String,
  date: String,
  people: Number,
  slot: String,
  flavour: String,
  size: String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

// Save checkout (cart items)
app.post("/save-checkout", async (req, res) => {
  try {
    console.log("Received checkout request:", JSON.stringify(req.body, null, 2));
    
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error("MongoDB not connected. State:", mongoose.connection.readyState);
      return res.status(503).json({ 
        message: "Database connection error. Please try again.",
        error: "MongoDB not connected"
      });
    }
    
    // Validate input
    if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
      console.log("Validation failed: Empty or invalid cart");
      return res.status(400).json({ message: "Cart is empty or invalid" });
    }
    
    if (req.body.total === undefined || req.body.total === null) {
      console.log("Validation failed: Missing total");
      return res.status(400).json({ message: "Total amount is required" });
    }

    const order = new Order({
      type: 'checkout',
      items: req.body.items,
      total: req.body.total
    });

    const savedOrder = await order.save();
    console.log("Checkout saved successfully to database:", savedOrder._id);
    console.log("Order details:", JSON.stringify(savedOrder, null, 2));
    
    res.json({ 
      message: "Checkout saved successfully!",
      orderId: savedOrder._id
    });
  } catch (err) {
    console.error("Error saving checkout:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({ 
      message: "Error saving checkout", 
      error: err.message,
      details: err.toString()
    });
  }
});

// Save workshop booking
app.post("/save-workshop", async (req, res) => {
  try {
    console.log("Received workshop booking:", JSON.stringify(req.body, null, 2));
    
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error("MongoDB not connected. State:", mongoose.connection.readyState);
      return res.status(503).json({ 
        message: "Database connection error. Please try again.",
        error: "MongoDB not connected"
      });
    }
    
    const order = new Order({
      type: 'workshop',
      name: req.body.name,
      date: req.body.date,
      people: req.body.people,
      slot: req.body.slot,
      total: req.body.total
    });

    const savedOrder = await order.save();
    console.log("Workshop booking saved successfully:", savedOrder._id);
    res.json({ 
      message: "Workshop booking saved successfully!",
      orderId: savedOrder._id
    });
  } catch (err) {
    console.error("Error saving workshop booking:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({ 
      message: "Error saving workshop booking",
      error: err.message
    });
  }
});

// Save self-fun booking
app.post("/save-self-fun", async (req, res) => {
  try {
    console.log("Received self-fun booking:", JSON.stringify(req.body, null, 2));
    
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error("MongoDB not connected. State:", mongoose.connection.readyState);
      return res.status(503).json({ 
        message: "Database connection error. Please try again.",
        error: "MongoDB not connected"
      });
    }
    
    const order = new Order({
      type: 'self-fun',
      name: req.body.name,
      date: req.body.date,
      people: req.body.people,
      flavour: req.body.flavour,
      size: req.body.size,
      total: req.body.total
    });

    const savedOrder = await order.save();
    console.log("Self-fun booking saved successfully:", savedOrder._id);
    res.json({ 
      message: "Self-fun booking saved successfully!",
      orderId: savedOrder._id
    });
  } catch (err) {
    console.error("Error saving self-fun booking:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({ 
      message: "Error saving self-fun booking",
      error: err.message
    });
  }
});

// Save feedback
app.post("/save-feedback", async (req, res) => {
  try {
    console.log("Received feedback:", JSON.stringify(req.body, null, 2));
    
    // Validate input
    if (!req.body.name || !req.body.date || !req.body.rating) {
      return res.status(400).json({ message: "Name, date, and rating are required" });
    }

    const feedback = {
      name: req.body.name,
      date: req.body.date,
      rating: req.body.rating,
      message: req.body.message || 'No additional comments',
      submittedAt: new Date().toISOString()
    };

    // Create feedbacks directory if it doesn't exist
    const feedbacksDir = path.join(__dirname, 'feedbacks');
    if (!fs.existsSync(feedbacksDir)) {
      fs.mkdirSync(feedbacksDir, { recursive: true });
    }

    // Append to text file
    const feedbackFile = path.join(feedbacksDir, 'feedbacks.txt');
    const feedbackText = `
========================================
Feedback Entry
========================================
Name: ${feedback.name}
Date of Visit: ${feedback.date}
Rating: ${feedback.rating}/5
Message: ${feedback.message}
Submitted At: ${feedback.submittedAt}
========================================

`;

    fs.appendFileSync(feedbackFile, feedbackText, 'utf8');
    
    console.log("Feedback saved successfully");
    res.json({ message: "Feedback saved successfully!" });
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).json({ 
      message: "Error saving feedback", 
      error: err.message 
    });
  }
});

// Get all feedbacks
app.get("/get-feedbacks", async (req, res) => {
  try {
    const feedbacksDir = path.join(__dirname, 'feedbacks');
    const feedbackFile = path.join(feedbacksDir, 'feedbacks.txt');
    
    if (!fs.existsSync(feedbackFile)) {
      return res.json({ feedbacks: [], text: 'No feedbacks yet.' });
    }
    
    const feedbackText = fs.readFileSync(feedbackFile, 'utf8');
    res.json({ feedbacks: feedbackText, text: feedbackText });
  } catch (err) {
    console.error("Error reading feedbacks:", err);
    res.status(500).json({ message: "Error reading feedbacks" });
  }
});

// Export all data to Excel
app.get("/export-data", async (req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error("MongoDB not connected. State:", mongoose.connection.readyState);
      return res.status(503).json({ 
        message: "Database connection error. Cannot export data.",
        error: "MongoDB not connected"
      });
    }
    
    console.log("Fetching orders from database...");
    const orders = await Order.find().sort({ createdAt: -1 });
    console.log(`Found ${orders.length} orders in database`);
    
    // Prepare data for Excel
    const excelData = orders.map(order => {
      const type = order.type || '';
      const name = order.name || '';
      const date = order.date || '';
      const people = order.people || '';
      const slot = order.slot || '';
      const flavour = order.flavour || '';
      const size = order.size || '';
      
      // Format items for checkout orders
      let itemsStr = '';
      if (order.type === 'checkout' && order.items && order.items.length > 0) {
        itemsStr = order.items.map(item => 
          `${item.name} (Qty: ${item.quantity})`
        ).join('; ');
      }
      
      const total = order.total || 0;
      const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleString() : '';
      
      return {
        'Type': type,
        'Name': name,
        'Date': date,
        'People': people,
        'Slot': slot,
        'Flavour': flavour,
        'Size': size,
        'Items': itemsStr,
        'Total': total,
        'Order Date': orderDate
      };
    });
    
    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    
    // Set column widths for better readability
    const colWidths = [
      { wch: 12 }, // Type
      { wch: 20 }, // Name
      { wch: 15 }, // Date
      { wch: 8 },  // People
      { wch: 15 }, // Slot
      { wch: 15 }, // Flavour
      { wch: 12 }, // Size
      { wch: 40 }, // Items
      { wch: 12 }, // Total
      { wch: 20 }  // Order Date
    ];
    worksheet['!cols'] = colWidths;
    
    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { 
      type: 'buffer', 
      bookType: 'xlsx' 
    });
    
    // Set headers for Excel download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=orders-export.xlsx');
    res.send(excelBuffer);
  } catch (err) {
    console.error("Error exporting data:", err);
    res.status(500).json({ message: "Error exporting data" });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
