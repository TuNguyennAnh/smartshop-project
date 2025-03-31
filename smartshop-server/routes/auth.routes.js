const express = require("express");
const router = express.Router();
const validateRegister = require("../middleware/validateRegister"); // Import middleware
const { register } = require("../controllers/auth.controller"); // Import controller

// API đăng ký
router.post("/register", validateRegister, register);

module.exports = router;
