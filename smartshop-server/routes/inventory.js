const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/inventory.controller');

router.post('/', auth, controller.createInventory);
router.get('/', auth, controller.getInventoryLogs);

module.exports = router;
