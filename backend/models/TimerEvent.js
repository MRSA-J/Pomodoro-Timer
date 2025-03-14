const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.MONGODB_URI);

// Define the schema for TimerEvent
const timerEventSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
    enum: ["start", "pause", "end"], // Only allow these values
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now, // Automatically set to the current date/time
  },
  mode: {
    type: String,
    required: true,
    enum: ["pomodoro", "shortBreak", "longBreak"], // Only allow these values
  },
});

// Create the TimerEvent model
const TimerEvent = conn.model("TimerEvent", timerEventSchema);

// Export the TimerEvent model
module.exports = TimerEvent;
