// /khoi_dich_vu/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware"); // Đường dẫn đến authMiddleware

// Định tuyến ví dụ cho chức năng cần xác thực
router.get("/protected-route", authMiddleware, (req, res) => {
  res.send("Bạn đã truy cập vào route được bảo vệ");
});

module.exports = router;
