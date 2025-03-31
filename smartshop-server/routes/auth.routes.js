const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

// Đăng ký tài khoản mới (mặc định là chủ shop, sẽ tự sinh shop riêng)
router.post("/register", register);

// Đăng nhập
router.post("/login", login);

module.exports = router;
