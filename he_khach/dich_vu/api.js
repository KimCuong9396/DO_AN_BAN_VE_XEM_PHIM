const express = require("express");
const router = express.Router();
const phimController = require("../controllers/phimController");
const veController = require("../controllers/veController");
const nhanVienController = require("../controllers/nhanVienController");
const thongKeController = require("../controllers/thongKeController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Phim
router.get("/phim", phimController.layTatCaPhim);
router.post("/phim", phimController.themPhim);

// Vé
router.get("/ve/:ngay", verifyToken, veController.traCuuVe);
router.post("/ve", verifyToken, veController.themVe);

// Nhân viên
router.post("/nv/login", nhanVienController.dangNhap);

// Thống kê
router.get("/thongke", verifyToken, thongKeController.thongKe);

module.exports = router;
