// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "shop_owner", "employee"],
    default: "shop_owner", // người đăng ký mới là chủ shop
  },

  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("User", userSchema);
