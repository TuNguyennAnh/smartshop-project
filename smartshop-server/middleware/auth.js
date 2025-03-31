const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token không tồn tại" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token không hợp lệ" });
  }
}

module.exports = authenticate;
