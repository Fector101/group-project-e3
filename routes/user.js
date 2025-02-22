const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

// Get User Dashboard Data
router.get('/user-dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;