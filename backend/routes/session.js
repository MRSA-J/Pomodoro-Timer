// routes/users.js
const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

router.post('/create_session', async (req, res) => {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
});

router.get('/get_user_history', async (req, res) => {
    const history = await Session.find({ user_email: req.query.email });
    res.status(200).json(history);
});

module.exports = router;