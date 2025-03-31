const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

// Đăng ký tài khoản mới (mặc định là chủ shop, sẽ tự sinh shop riêng)
router.post("/register", validateRegister, register);

// Đăng nhập
router.post("/login", validateLogin, login);

module.exports = router;
