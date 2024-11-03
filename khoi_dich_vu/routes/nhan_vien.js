const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const duongDanFile = path.join(__dirname, "../du_lieu/nhan_vien.json");

// Đăng nhập
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  fs.readFile(duongDanFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi đọc dữ liệu." });
    }
    const nhanVienList = JSON.parse(data);
    const user = nhanVienList.find(
      (nv) => nv.username === username && nv.password === password
    );

    if (user) {
      return res.json(user); // Trả về thông tin người dùng
    } else {
      return res
        .status(401)
        .json({ message: "Tài khoản hoặc mật khẩu không chính xác." });
    }
  });
});
// Bán vé
router.post("/ban_ve", (req, res) => {
  const { id_xuat_chieu, so_luong } = req.body;
  const xuatChieu = readData(xuatChieuPath);
  const banVe = readData(banVePath);

  if (!kiemTraGheTrong(id_xuat_chieu, so_luong)) {
    return res
      .status(400)
      .json({ message: "Không đủ ghế trống hoặc xuất chiếu không tồn tại." });
  }

  // Cập nhật số ghế trống
  const xuat = xuatChieu.find((x) => x.id === id_xuat_chieu);
  xuat.so_ghe_trong -= so_luong;
  writeData(xuatChieuPath, xuatChieu);

  // Lưu thông tin vé bán
  const newVe = {
    id_ve: banVe.length + 1,
    id_xuat_chieu,
    so_luong,
    ngay_ban: new Date().toISOString().split("T")[0],
  };
  banVe.push(newVe);
  writeData(banVePath, banVe);

  res.json({ message: "Bán vé thành công", newVe });
});

module.exports = router;
