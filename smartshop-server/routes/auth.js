const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Đăng ký
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const exist = await User.findOne({ username });
    if (exist) return res.status(400).json({ msg: 'Tài khoản đã tồn tại' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashed });
    await newUser.save();

    res.status(201).json({ msg: 'Đăng ký thành công' });
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi server' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Sai tài khoản' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Sai mật khẩu' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ msg: 'Đăng nhập thành công', token, role: user.role });
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi server' });
  }
});

// Xử lý quên mật khẩu (Forgot Password)
router.post("/forgot-password", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: "Vui lòng nhập tên đăng nhập" });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Tài khoản không tồn tại" });

    // Reset về mật khẩu mặc định: 123456 (có thể hash lại nếu bạn đang dùng bcrypt)
    user.password = "123456"; // Lưu ý: Mật khẩu phải được mã hóa nếu bạn đang sử dụng bcrypt
    await user.save();

    res.json({ message: "Mật khẩu đã được đặt lại về '123456'. Hãy đăng nhập và đổi lại mật khẩu!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Xử lý thay đổi mật khẩu
router.post("/change-password", async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  // Kiểm tra các trường dữ liệu
  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    // Tìm kiếm tài khoản
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    // Kiểm tra mật khẩu cũ (nếu dùng bcrypt, so sánh mật khẩu đã mã hóa)
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
    }

    // Mã hóa mật khẩu mới nếu dùng bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword; // Cập nhật mật khẩu mới

    await user.save(); // Lưu thay đổi

    res.json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
