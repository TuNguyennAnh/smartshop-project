const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const productRoutes = require('./routes/product.routes');
const inventoryRoutes = require('./routes/inventory');
const orderRoutes = require('./routes/order');
const statsRoutes = require('./routes/stats');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

// Load env variables
dotenv.config();

// CORS cấu hình đúng chuẩn
const corsOptions = {
  origin: "https://smartshop-frontend.onrender.com",
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use(cors({
  origin: "https://smartshop-frontend.onrender.com",
  credentials: true
}));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Cho phép preflight

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Kết nối MongoDB thành công");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  }
};
connectDB();

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Đã xảy ra lỗi trên server" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
