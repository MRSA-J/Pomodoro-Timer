// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const app = express();
require("dotenv").config();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Add this line to parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/timer-event", require("./routes/timerEvent")); // Ensure this line is present

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
