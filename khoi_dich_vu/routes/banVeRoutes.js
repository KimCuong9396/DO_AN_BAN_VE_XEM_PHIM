const express = require("express");
const router = express.Router();
const banVeController = require("../controllers/banVeController");

// Route tra cứu lịch chiếu
router.get("/lich-chieu", banVeController.traCuuLichChieu);

// Route lấy chi tiết lịch chiếu theo ID
router.get("/lich-chieu/:id", banVeController.layChiTietLichChieu);

// Route bán vé
router.post("/ban-ve/:id", banVeController.banVe);

module.exports = router;
