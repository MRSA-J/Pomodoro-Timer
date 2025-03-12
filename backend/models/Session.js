// models/User.js
const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGODB_URI);

const sessionSchema = new mongoose.Schema({
    user_email: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    duration: { type: Number, required: true },
});

const Session = conn.model('Session', sessionSchema);

// Export the User model
module.exports = Session;