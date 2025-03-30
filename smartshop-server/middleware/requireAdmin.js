const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticate = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin"); // 👈 Bảo vệ bằng quyền admin

router.get("/", authenticate, requireAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

module.exports = requireAdmin; // ✅ Đừng quên dòng này!
