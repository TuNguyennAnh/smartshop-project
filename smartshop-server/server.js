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

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));

// Middleware
app.use(cors({
  origin: "https://smartshop-frontend.onrender.com",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://smartshop-frontend.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// Route đăng nhập
app.post("/api/auth/login", (req, res) => {
  res.json({ message: "Login thành công!" });
});

// Kiểm tra nếu không có route nào khớp -> trả về 404
app.use((req, res) => {
  res.status(404).json({ message: "Route không tồn tại!" });
});

// MongoDB Connection
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

// Connect to MongoDB
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Đã xảy ra lỗi trên server" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
