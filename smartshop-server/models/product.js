// models/Product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  sku: {
    type: String,
    unique: true,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    default: 0,
  },

  description: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Product", productSchema);
