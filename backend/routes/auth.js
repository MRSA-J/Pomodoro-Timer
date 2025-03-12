// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/register_user', async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a user by email; return null if not found
router.get('/is_user_registered', async (req, res) => {
  const email = req.query.email;
  if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required.' });
  }

  try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.send(false); // Return an empty response or message
      }
      res.send(true);
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ... Add more routes for updating and deleting users as needed

module.exports = router;