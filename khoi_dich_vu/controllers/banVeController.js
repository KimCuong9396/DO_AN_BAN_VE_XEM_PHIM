const fs = require("fs");
const path = require("path");

// Đọc dữ liệu từ file JSON (Giả lập dữ liệu cho bài học này)
const duongDanLichChieu = path.join(__dirname, "../du_lieu/lich_chieu.json");
let lichChieu = JSON.parse(fs.readFileSync(duongDanLichChieu, "utf-8"));

// Tra cứu lịch chiếu theo các tiêu chí
exports.traCuuLichChieu = (req, res) => {
  const { ten_phim, ca_chieu, ngay_chieu } = req.query;

  // Lọc danh sách lịch chiếu theo các tiêu chí
  const ketQua = lichChieu.filter(
    (item) =>
      (!ten_phim || item.ten_phim.includes(ten_phim)) &&
      (!ca_chieu || item.ca_chieu === ca_chieu) &&
      (!ngay_chieu || item.ngay_chieu === ngay_chieu)
  );

  if (ketQua.length > 0) {
    res.json(ketQua);
  } else {
    res.status(404).json({ message: "Không tìm thấy lịch chiếu phù hợp." });
  }
};

// Lấy thông tin chi tiết lịch chiếu theo ID
exports.layChiTietLichChieu = (req, res) => {
  const { id } = req.params;
  const lich = lichChieu.find((item) => item.id === parseInt(id));

  if (lich) {
    res.json(lich);
  } else {
    res.status(404).json({ message: "Lịch chiếu không tồn tại." });
  }
};

// Bán vé và cập nhật số ghế còn lại
exports.banVe = (req, res) => {
  const { id } = req.params;
  const { seats } = req.body;

  const lich = lichChieu.find((item) => item.id === parseInt(id));

  if (!lich) {
    return res.status(404).json({ message: "Lịch chiếu không tồn tại." });
  }

  // Kiểm tra số ghế còn lại
  if (lich.so_ghe >= seats.length) {
    // Cập nhật số ghế sau khi bán vé
    lich.so_ghe -= seats.length;

    // Lưu lại dữ liệu mới vào file JSON
    fs.writeFileSync(
      duongDanLichChieu,
      JSON.stringify(lichChieu, null, 2),
      "utf-8"
    );

    res.json({ message: "Bán vé thành công!" });
  } else {
    res.status(400).json({ message: "Số ghế không đủ." });
  }
};
