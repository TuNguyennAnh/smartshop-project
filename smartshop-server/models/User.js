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
    enum: ["admin", "owner", "staff"],
    default: "owner", // Người đăng ký mặc định là chủ shop
  },

  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop", // Liên kết đến shop mà người này thuộc về
    required: function () {
      return this.role !== "admin";
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
