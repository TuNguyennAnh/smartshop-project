const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const authenticate = require("../middleware/authenticate");
const requireAdmin = require("../middleware/requireAdmin");
const { createEmployee, getEmployees } = require("../controllers/user.controller");
const User = require("../models/User");

// API tạo nhân viên
router.post("/create-employee", verifyToken, createEmployee);

// API lấy danh sách nhân viên
router.get("/employees", verifyToken, getEmployees);

// API lấy thông tin người dùng hiện tại
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// API lấy danh sách người dùng (chỉ admin)
router.get("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router; // Export router
