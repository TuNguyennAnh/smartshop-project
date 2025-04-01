const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth.controller");

router.get("/test", (req, res) => {
  res.send("Auth route hoạt động!");
});
router.post("/login", login);
router.post("/register", register);

module.exports = router; // <-- BẮT BUỘC PHẢI CÓ DÒNG NÀY
