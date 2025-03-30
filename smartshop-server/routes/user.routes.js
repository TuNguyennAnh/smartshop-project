const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyAdmin = require('../middleware/verifyAdmin'); // ✅ Dùng cái này là đủ

// Chỉ admin được xem danh sách user
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
