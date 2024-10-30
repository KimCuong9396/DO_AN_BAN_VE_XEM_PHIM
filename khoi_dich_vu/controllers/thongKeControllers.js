const fs = require("fs");
const path = require("path");

const veFilePath = path.join(__dirname, "../du_lieu/ve.json");
const phimFilePath = path.join(__dirname, "../du_lieu/phim.json");

// Đọc dữ liệu từ file JSON
const readVeData = () => {
  const data = fs.readFileSync(veFilePath);
  return JSON.parse(data);
};

const readPhimData = () => {
  const data = fs.readFileSync(phimFilePath);
  return JSON.parse(data);
};

// Lấy thống kê
exports.getStatistics = (req, res) => {
  const ve = readVeData();
  const phim = readPhimData();

  const totalVe = ve.length;
  const totalPhim = phim.length;

  res.json({
    totalVe,
    totalPhim,
  });
};
