const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createShopForUser } = require("./shop.controller");

// Đăng ký tài khoản mới (mặc định là chủ shop)
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem username đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo mới user
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "owner", // mặc định là chủ shop
    });

    // Lưu user mới vào database
    await newUser.save();

    // Tạo shop tương ứng
    const defaultShopName = `${username}'s Shop`;
    await createShopForUser(newUser._id, defaultShopName);

    // Trả về kết quả thành công
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi đăng ký", error: err.message });
  }
};

// Đăng nhập tài khoản
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm user theo username và populate thông tin shop
    const user = await User.findOne({ username }).populate("shop");
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    // Tạo JWT token với thêm thông tin shop
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        shop: user.shop?._id, // Thêm ID của shop vào token
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Giảm thời gian hết hạn xuống 1 ngày
    );

    // Trả về token và thông tin người dùng cùng với shop
    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        shop: user.shop, // Trả về thông tin shop đầy đủ
      },
    });
  } catch (err) {
    console.error("Lỗi đăng nhập:", err.message);
    res.status(500).json({
      message: "Lỗi server khi đăng nhập",
      error: err.message,
    });
  }
};

module.exports = {
  register,
  login,
};
