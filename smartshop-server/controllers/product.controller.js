const Product = require('../models/Product');

// Thêm sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, shopId: req.user.id }); // Gắn shopId từ token
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lấy toàn bộ sản phẩm của shop hiện tại
exports.getProducts = async (req, res) => {
  const products = await Product.find({ shopId: req.user.id });
  res.json(products);
};

// Lấy chi tiết sản phẩm
exports.getProductById = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id, shopId: req.user.id });
  if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  res.json(product);
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, shopId: req.user.id },
    req.body,
    { new: true }
  );
  if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  res.json(product);
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id, shopId: req.user.id });
  if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  res.json({ message: 'Đã xóa sản phẩm' });
};
