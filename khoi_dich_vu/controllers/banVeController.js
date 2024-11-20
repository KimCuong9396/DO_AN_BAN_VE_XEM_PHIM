const fs = require("fs");
const path = require("path");
const lapLichFile = path.join(__dirname, "../du_lieu/lap_lich.json");
const veBanFile = path.join(__dirname, "../du_lieu/ve_ban.json");

// Hàm bán vé
exports.banVe = (req, res) => {
  const { ten_phim, phong_chieu, so_ghe, username, ngay_ban } = req.body;

  // Đọc file ve_ban.json
  fs.readFile(veBanFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi đọc file vé bán." });

    const veBanData = JSON.parse(data);
    veBanData.push({ ten_phim, phong_chieu, so_ghe, username, ngay_ban });

    // Ghi lại dữ liệu vào ve_ban.json
    fs.writeFile(veBanFile, JSON.stringify(veBanData, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Lỗi ghi file vé bán." });

      // Thành công
      res.status(200).json({ message: "Bán vé thành công." });
    });
  });
};

// Hàm cập nhật lịch chiếu sau khi bán vé
exports.capNhatLichChieu = (req, res) => {
  const { phong_chieu, so_ghe } = req.body;

  // Đọc file lap_lich.json
  fs.readFile(lapLichFile, "utf8", (err, data) => {
    if (err)
      return res.status(500).json({ message: "Lỗi đọc file lịch chiếu." });

    const lapLichData = JSON.parse(data);
    const updatedData = lapLichData.map((item) => {
      if (item.phong_chieu === phong_chieu) {
        item.so_ghe = so_ghe; // Cập nhật số ghế
      }
      return item;
    });

    // Ghi lại dữ liệu vào lap_lich.json
    fs.writeFile(lapLichFile, JSON.stringify(updatedData, null, 2), (err) => {
      if (err)
        return res.status(500).json({ message: "Lỗi ghi file lịch chiếu." });

      res.status(200).json({ message: "Cập nhật lịch chiếu thành công." });
    });
  });
};
