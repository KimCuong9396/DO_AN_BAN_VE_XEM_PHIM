// routes/lapLichRoutes.js
const express = require("express");
const router = express.Router();
const lapLichController = require("../controllers/lapLichController");

// Lấy danh sách lịch chiếu
router.get("/lich_chieu", lapLichController.layDanhSachLichChieu);

// Lấy danh sách phim
router.get("/phim", lapLichController.layDanhSachPhim);

// Tạo lịch chiếu mới
router.post("/lap_lich", lapLichController.taoLichChieu);

// Xóa lịch chiếu theo ID
router.delete("/lich_chieu/:id", lapLichController.xoaLichChieu);

module.exports = router;
