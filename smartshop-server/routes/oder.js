const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/order.controller');

router.post('/', auth, controller.createOrder);
router.get('/', auth, controller.getOrders);
router.put('/:id/status', auth, controller.updateOrderStatus);

module.exports = router;
