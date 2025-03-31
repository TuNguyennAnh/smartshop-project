const Shop = require("../models/shop");

exports.createShopForUser = async (userId) => {
  try {
    const shop = new Shop({
      owner: userId,
      name: `Shop của người dùng ${userId}`,
      createdAt: new Date(),
    });

    await shop.save();
  } catch (err) {
    console.error("Lỗi khi tạo shop:", err);
  }
};
