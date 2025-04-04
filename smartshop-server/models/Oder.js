const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  items: [
    {
      sku: String,
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },

  paymentMethod: { type: String, enum: ['cash', 'bank', 'momo'], default: 'cash' },
  paid: { type: Boolean, default: false },
  
});

module.exports = mongoose.model('Order', orderSchema);
