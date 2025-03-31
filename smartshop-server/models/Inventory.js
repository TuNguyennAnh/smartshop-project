const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  sku: { type: String, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['import', 'export'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventory', inventorySchema);
