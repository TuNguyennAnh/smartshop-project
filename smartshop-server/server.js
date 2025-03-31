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

// CORS Config
const corsOptions = {
  origin: "https://smartshop-frontend.onrender.com",
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.options("*", cors(corsOptions)); // Cho phép preflight
app.use(cors(corsOptions));          // Dùng middleware chính

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Nếu không khớp route nào
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
connectDB();

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Đã xảy ra lỗi trên server" });
});

// Start
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
