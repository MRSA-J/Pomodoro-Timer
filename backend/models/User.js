// models/User.js
const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const User = conn.model('User', userSchema);

// Export the User model
module.exports = User;