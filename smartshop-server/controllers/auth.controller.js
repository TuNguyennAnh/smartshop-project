// controllers/auth.controller.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createShopForUser } = require("./shop.controller");

// Đăng ký tài khoản mới (mặc định là chủ shop)
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: "owner", // mặc định là chủ shop
    });

    await newUser.save();

    // Tạo shop tương ứng
    const defaultShopName = `${username}'s Shop`;
    await createShopForUser(newUser._id, defaultShopName);

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi đăng ký", error: err.message });
  }
};

// Đăng nhập tài khoản
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Mật khẩu không đúng" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({
      message: "Đăng nhập thành công",
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi đăng nhập", error: err.message });
  }
};

module.exports = {
  register,
  login,
};
