const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const requireAdmin = require('../middleware/requireAdmin');

// ✅ Chỉ admin mới được truy cập danh sách user
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'username role'); // chỉ trả về username + role
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
