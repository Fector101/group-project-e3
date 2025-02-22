const express = require('express');
const router = express.Router();
// const { authMiddleware, isAdmin } = require('../middlewares/authn');
const User = require('../models/user');

// Fetch app data for admins
router.get('/admin-dashboard', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Don't send passwords
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
