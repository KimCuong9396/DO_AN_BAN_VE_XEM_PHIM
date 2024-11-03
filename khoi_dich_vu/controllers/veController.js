// /khoi_dich_vu/controllers/veController.js
const fs = require("fs");
const path = require("path");

// Bán vé
exports.banVe = (req, res) => {
  const { xuatChieuId, soLuongVe } = req.body;
  const veDataPath = path.join(__dirname, "../../du_lieu/ban_ve.json");
  const xuatChieuDataPath = path.join(
    __dirname,
    "../../du_lieu/xuat_chieu.json"
  );

  let veData = JSON.parse(fs.readFileSync(veDataPath, "utf-8"));
  let xuatChieuData = JSON.parse(fs.readFileSync(xuatChieuDataPath, "utf-8"));

  const xuatChieu = xuatChieuData.find((xc) => xc.id === xuatChieuId);

  if (xuatChieu && xuatChieu.soGheTrong >= soLuongVe) {
    // Giảm số ghế trống và cập nhật
    xuatChieu.soGheTrong -= soLuongVe;
    fs.writeFileSync(xuatChieuDataPath, JSON.stringify(xuatChieuData));

    // Lưu dữ liệu vé mới vào ban_ve.json
    const newVe = { id: veData.length + 1, xuatChieuId, soLuongVe };
    veData.push(newVe);
    fs.writeFileSync(veDataPath, JSON.stringify(veData));

    res.status(200).json({ message: "Bán vé thành công" });
  } else {
    res.status(400).json({ message: "Không đủ ghế trống" });
  }
};
