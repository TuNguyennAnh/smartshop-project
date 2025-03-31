const User = require("../models/User");
const Shop = require("../models/Shop");
const bcrypt = require("bcryptjs");

// ✅ Chủ shop tạo nhân viên mới cho shop của mình
exports.createEmployee = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra tài khoản trùng
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });

    // Tạo tài khoản nhân viên
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "employee",
    });
    await newUser.save();

    // Tìm shop của chủ shop (người đang đăng nhập)
    const shop = await Shop.findOne({ owner: req.user.id });
    if (!shop) return res.status(404).json({ message: "Không tìm thấy shop" });

    // Gán nhân viên vào shop
    shop.employees.push(newUser._id);
    await shop.save();

    res.status(201).json({ message: "Tạo nhân viên thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
  // ✅ Lấy danh sách nhân viên của shop hiện tại
exports.getEmployees = async (req, res) => {
    try {
      const shop = await Shop.findOne({ owner: req.user.id }).populate("employees", "-password");
      if (!shop) return res.status(404).json({ message: "Không tìm thấy shop" });
  
      res.json({ employees: shop.employees });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server" });
    }
  };
};
