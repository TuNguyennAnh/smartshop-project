const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const controller = require('../controllers/stats.controller');

// ✅ Chỉ admin mới được xem thống kê
router.get('/revenue', auth, requireAdmin, controller.getRevenue);
router.get('/revenue/daily', auth, requireAdmin, controller.getRevenueByDate);

module.exports = router;
