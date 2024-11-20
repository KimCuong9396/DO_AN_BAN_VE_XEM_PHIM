const fs = require("fs");
const path = require("path");

// Đọc dữ liệu từ file JSON
const banVeFilePath = path.join(__dirname, "../du_lieu/ve_ban.json");

// Hàm đọc và phân tích dữ liệu bán vé
const docDuLieuVeBan = () => {
  const data = fs.readFileSync(banVeFilePath);
  return JSON.parse(data);
};

// Hàm thống kê số vé bán theo tháng và năm
const thongKeSoVeBan = (thang, nam) => {
  const veBan = docDuLieuVeBan();
  let ketQua = [];
  let tongSoVe = 0;

  veBan.forEach((ve) => {
    const ngayBan = new Date(ve.ngay_ban);
    if (ngayBan.getMonth() + 1 === thang && ngayBan.getFullYear() === nam) {
      const phimExist = ketQua.find((p) => p.ten_phim === ve.ten_phim);

      if (phimExist) {
        phimExist.so_ve_ban += ve.so_luong_ghe;
      } else {
        ketQua.push({
          ten_phim: ve.ten_phim,
          so_ve_ban: ve.so_luong_ghe,
          ca_chieu: ve.ca_chieu,
          so_ve: ve.so_ghe,
          ty_le: (ve.so_luong_ghe / ve.so_ghe) * 100,
        });
      }
      tongSoVe += ve.so_luong_ghe;
    }
  });

  return {
    thang: thang,
    nam: nam,
    tong_so_ve: tongSoVe,
    chi_tiet: ketQua,
  };
};

// Controller để xử lý yêu cầu thống kê
const thongKeVes = (req, res) => {
  const { thang, nam } = req.body; // Dữ liệu gửi từ form chọn tháng và năm
  const ketQuaThongKe = thongKeSoVeBan(thang, nam);

  res.json(ketQuaThongKe);
};

module.exports = {
  thongKeVes,
};
