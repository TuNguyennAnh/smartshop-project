const Inventory = require('../models/inventory');

// POST: thêm lịch sử kho
exports.createInventory = async (req, res) => {
  try {
    const { sku, quantity, type } = req.body;
    const inventory = new Inventory({ sku, quantity, type });
    await inventory.save();
    res.status(201).json({ msg: 'Đã lưu lịch sử kho' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi lưu lịch sử kho' });
  }
};

// GET: danh sách lịch sử kho
exports.getInventoryLogs = async (req, res) => {
  try {
    const logs = await Inventory.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi lấy danh sách kho' });
  }
};
