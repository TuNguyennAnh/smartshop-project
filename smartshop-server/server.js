const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require("./routes/user.routes"); // ✅ Chỉ khai báo 1 lần

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Gắn các route
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes); // ⚠️ KHÔNG khai báo lại ở dưới nữa
app.use('/api/dashboard', dashboardRoutes);

// ✅ Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.get("/", (req, res) => res.send("SmartShop API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
