// /khoi_dich_vu/controllers/phimController.js
const fs = require("fs");
const path = require("path");

// Tra cứu xuất chiếu theo tiêu chí
exports.traCuuXuatChieu = (req, res) => {
  const { tenPhim, caChieu, ngayChieu } = req.query;
  const xuatChieuDataPath = path.join(
    __dirname,
    "../../du_lieu/xuat_chieu.json"
  );

  let xuatChieuData = JSON.parse(fs.readFileSync(xuatChieuDataPath, "utf-8"));

  // Lọc theo tiêu chí tra cứu
  let results = xuatChieuData.filter(
    (xc) =>
      (!tenPhim || xc.tenPhim === tenPhim) &&
      (!caChieu || xc.caChieu === caChieu) &&
      (!ngayChieu || xc.ngayChieu === ngayChieu)
  );

  res.json(results);
};
