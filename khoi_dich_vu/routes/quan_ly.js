const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const xuatChieuPath = path.join(__dirname, "../du_lieu/xuat_chieu.json");

function readData(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Lập lịch chiếu phim
router.post("/lap_lich_chieu", (req, res) => {
  const { id_phim, id_phong, ca_chieu, ngay_chieu } = req.body;
  const xuatChieu = readData(xuatChieuPath);

  const newXuatChieu = {
    id: xuatChieu.length + 1,
    id_phim,
    id_phong,
    ca_chieu,
    ngay_chieu,
    so_ghe_trong: 100, // Giả sử tất cả suất chiếu đều có 100 ghế ban đầu
  };

  xuatChieu.push(newXuatChieu);
  writeData(xuatChieuPath, xuatChieu);

  res.json({ message: "Lập lịch chiếu thành công", xuat_chieu: newXuatChieu });
});

module.exports = router;
