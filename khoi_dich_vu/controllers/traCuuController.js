const fs = require("fs");
const path = require("path");

// Hàm đọc dữ liệu từ file JSON
const readLichChieuData = () => {
  const dataPath = path.join(__dirname, "../du_lieu/lich_chieu.json");
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

// Hàm tra cứu lịch chiếu
const traCuuLichChieu = (req, res) => {
  const { ten_phim, ca_chieu, ngay_chieu } = req.query;
  const lichChieuData = readLichChieuData();

  // Lọc dữ liệu theo tiêu chí tra cứu
  const ketQua = lichChieuData.filter((item) => {
    return (
      (!ten_phim || item.ten_phim.includes(ten_phim)) &&
      (!ca_chieu || item.ca_chieu === ca_chieu) &&
      (!ngay_chieu || item.ngay_chieu === ngay_chieu)
    );
  });

  res.status(200).json(ketQua);
};

module.exports = { traCuuLichChieu };
