// models/Shop.js

const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Chủ shop chính
    required: true,
  },

  address: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Shop", shopSchema);
