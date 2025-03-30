const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyAdmin = require('../middleware/verifyAdmin'); // ✅ middleware kiểm tra quyền admin

// Chỉ admin được xem danh sách user
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Lỗi server" });
  }
});

module.exports = router;
