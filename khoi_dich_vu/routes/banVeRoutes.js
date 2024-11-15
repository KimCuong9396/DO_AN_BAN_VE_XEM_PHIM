const express = require("express");
const router = express.Router();
const banVeController = require("../controllers/banVeController");

// Route tìm kiếm theo tên phim
router.get("/tim-kiem", banVeController.timKiemTheoTenPhim);

module.exports = router;
