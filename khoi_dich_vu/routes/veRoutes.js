// /khoi_dich_vu/routes/veRoutes.js
const express = require("express");
const router = express.Router();
const veController = require("../controllers/veController");
const phimController = require("../controllers/phimController");

// Định tuyến bán vé
router.post("/ban_ve", veController.banVe);

// Định tuyến tra cứu xuất chiếu
router.get("/tra_cuu_xuat_chieu", phimController.traCuuXuatChieu);

module.exports = router;
