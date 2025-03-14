const express = require("express");
const router = express.Router();
const TimerEvent = require("../models/TimerEvent"); // Assuming the TimerEvent model is exported from models/User.js

// Route to save a timer event
router.post("/create", async (req, res) => {
  try {
    const { email, event, mode } = req.body;

    // Validate required fields
    if (!email || !event || !mode) {
      return res
        .status(400)
        .json({ message: "Email, event, and mode are required" });
    }

    // Create a new timer event
    const newEvent = new TimerEvent({
      email,
      event,
      mode,
    });

    // Save the event to the database
    await newEvent.save();

    // Respond with the saved event
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error saving timer event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch timer events for a specific user
router.get("/timer-events/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Fetch all timer events for the user
    const events = await TimerEvent.find({ email }).sort({ createdAt: -1 }); // Sort by createdAt in descending order

    // Respond with the events
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching timer events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
