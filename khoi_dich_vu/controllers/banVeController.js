const fs = require("fs");
const path = require("path");

// Hàm tìm kiếm lịch chiếu theo tên phim
exports.timKiemTheoTenPhim = (req, res) => {
  const { tenPhim } = req.query; // Lấy tên phim từ query string

  if (!tenPhim) {
    return res.status(400).json({ message: "Tên phim không được để trống" });
  }

  fs.readFile(
    path.join(__dirname, "../du_lieu/lich_chieu.json"),
    "utf8",
    (err, data) => {
      if (err) {
        return res.status(500).send("Lỗi đọc dữ liệu");
      }

      const lichChieu = JSON.parse(data);

      // Tìm kiếm lịch chiếu theo tên phim
      const ketQua = lichChieu.filter((item) =>
        item.ten_phim.toLowerCase().includes(tenPhim.toLowerCase())
      );

      if (ketQua.length > 0) {
        res.json({ status: "found", lichChieu: ketQua });
      } else {
        res.json({
          status: "not_found",
          message: "Không tìm thấy lịch chiếu cho phim này",
        });
      }
    }
  );
};
