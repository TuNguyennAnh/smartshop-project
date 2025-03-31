const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth.controller");

router.post("/login", login);   // ✅ Phải có dòng này
router.post("/register", register);

router.get("/test", (req, res) => {
  res.send("Auth route hoạt động!");
});

module.exports = router;
