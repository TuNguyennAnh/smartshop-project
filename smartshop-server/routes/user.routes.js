const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticate = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");

// Lấy thông tin người dùng hiện tại
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Lấy danh sách người dùng (chỉ admin)
router.get("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = requireAdmin;
