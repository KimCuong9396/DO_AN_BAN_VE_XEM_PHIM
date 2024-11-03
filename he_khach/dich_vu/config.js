const path = require("path");

const config = {
  duongDanPhim: path.join(__dirname, "../du_lieu/phim.json"),
  duongDanVe: path.join(__dirname, "../du_lieu/ban_ve.json"),
  duongDanNhanVien: path.join(__dirname, "../du_lieu/nhan_vien.json"),
  duongDanRap: path.join(__dirname, "../du_lieu/xuat_chieu.json"),
  jwtSecret: "secretkey", // Đổi thành chuỗi bí mật thực tế
};

module.exports = config;
