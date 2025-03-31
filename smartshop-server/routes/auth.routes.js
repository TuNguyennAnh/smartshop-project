const express = require("express");
const router = express.Router();
const validateRegister = require("../middleware/validateRegister");
const { register, login } = require("../controllers/auth.controller"); // Thêm login vào đây

// API đăng ký và đăng nhập
router.post("/register", validateRegister, register);
router.post("/login", (req, res) => {
    res.json({ message: "Login thành công!" });
  });
  
module.exports = router;
