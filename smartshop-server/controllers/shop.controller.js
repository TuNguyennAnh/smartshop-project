// controllers/shop.controller.js

const Shop = require("../models/shop");
const User = require("../models/User");

// Tạo shop mới (chỉ dùng khi user được tạo)
const createShopForUser = async (userId, shopName) => {
  try {
    const shop = new Shop({
      name: shopName,
      owner: userId,
    });
    await shop.save();
    return shop;
  } catch (err) {
    throw new Error("Không thể tạo shop: " + err.message);
  }
};

// Lấy thông tin shop theo user (shop owner hoặc nhân viên)
const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.user.id });
    if (!shop) return res.status(404).json({ message: "Không tìm thấy shop" });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = {
  createShopForUser,
  getMyShop,
};
