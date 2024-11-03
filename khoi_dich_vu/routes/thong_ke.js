// routes/thong_ke.js

const express = require("express");
const router = express.Router();
const thongKeController = require("../controllers/thongKeController");

// Lấy thống kê doanh thu
router.get("/doanh_thu", thongKeController.layThongKe);

module.exports = router;
