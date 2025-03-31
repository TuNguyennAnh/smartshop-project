const Order = require('../models/Oder');

// Tổng doanh thu
exports.getRevenue = async (req, res) => {
  try {
    const orders = await Order.find({ paid: true });
    const total = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    res.json({ totalRevenue: total });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi thống kê doanh thu' });
  }
};

// Thống kê theo ngày
exports.getRevenueByDate = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { paid: true } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi thống kê theo ngày' });
  }
};
