const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// API trả dữ liệu dashboard
router.get('/', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: 'Thiếu token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      username: decoded.username || 'Người dùng',
      revenueToday: 3890000,
      profit: 1200000,
      orders: 23
    });
  } catch (err) {
    res.status(403).json({ message: 'Token không hợp lệ' });
  }
});

module.exports = router;
