const Order = require('../models/Oder');

// POST: Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const { customerName, phone, address, items, totalAmount } = req.body;
    const order = new Order({ customerName, phone, address, items, totalAmount });
    await order.save();
    res.status(201).json({ msg: 'Đã tạo đơn hàng', order });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tạo đơn hàng' });
  }
};

// GET: Lấy danh sách đơn hàng
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi lấy đơn hàng' });
  }
};

// PUT: Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
    res.json({ msg: 'Đã cập nhật trạng thái', order });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật trạng thái' });
  }
};
