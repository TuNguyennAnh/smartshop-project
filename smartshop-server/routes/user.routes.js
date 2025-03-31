const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const authenticate = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");
const User = require("../models/User");

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newEmployee = new User({ name, email, role });
    await newEmployee.save();
    res.status(201).json({ message: "Nhân viên đã được tạo", employee: newEmployee });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo nhân viên", error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhân viên", error: err.message });
  }
};

// API tạo nhân viên
router.post("/create-employee", verifyToken, exports.createEmployee);

// API lấy danh sách nhân viên
router.get("/employees", verifyToken, exports.getEmployees);

// API lấy thông tin người dùng hiện tại
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

// API lấy danh sách người dùng (chỉ admin)
router.get("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

module.exports = router;
