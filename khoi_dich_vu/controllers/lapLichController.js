// controllers/lapLichController.js
const fs = require("fs");
const path = require("path");

const LICH_CHIEU_PATH = path.join(__dirname, "../du_lieu/lich_chieu.json");
const PHIM_PATH = path.join(__dirname, "../du_lieu/phim.json");

// Hàm lấy danh sách lịch chiếu
exports.layDanhSachLichChieu = (req, res) => {
  try {
    const data = fs.readFileSync(LICH_CHIEU_PATH, "utf-8");
    const lichChieu = JSON.parse(data);
    res.json(lichChieu);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách lịch chiếu." });
  }
};

// Hàm lấy danh sách phim
exports.layDanhSachPhim = (req, res) => {
  try {
    const data = fs.readFileSync(PHIM_PATH, "utf-8");
    const phim = JSON.parse(data);
    res.json(phim);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách phim." });
  }
};

// Hàm tạo lịch chiếu mới
exports.taoLichChieu = (req, res) => {
  try {
    const lichChieuData = JSON.parse(fs.readFileSync(LICH_CHIEU_PATH, "utf-8"));
    const newLich = { id: Date.now().toString(), ...req.body };
    lichChieuData.push(newLich);
    fs.writeFileSync(LICH_CHIEU_PATH, JSON.stringify(lichChieuData, null, 2));
    res.json(newLich);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lập lịch chiếu." });
  }
};

// Hàm xóa lịch chiếu
exports.xoaLichChieu = (req, res) => {
  try {
    let lichChieuData = JSON.parse(fs.readFileSync(LICH_CHIEU_PATH, "utf-8"));
    lichChieuData = lichChieuData.filter((item) => item.id !== req.params.id);
    fs.writeFileSync(LICH_CHIEU_PATH, JSON.stringify(lichChieuData, null, 2));
    res.json({ message: "Xóa lịch chiếu thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa lịch chiếu." });
  }
};
