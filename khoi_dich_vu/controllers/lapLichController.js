const fs = require("fs");
const path = require("path");

const phimFilePath = path.join(__dirname, "../du_lieu/phim.json");
const lichChieuFilePath = path.join(__dirname, "../du_lieu/lich_chieu.json");

// Đọc dữ liệu từ file JSON
function getPhimList() {
  return JSON.parse(fs.readFileSync(phimFilePath, "utf-8"));
}

function getLichChieuList() {
  return JSON.parse(fs.readFileSync(lichChieuFilePath, "utf-8"));
}

// Tạo lịch chiếu mới và lưu vào file JSON
function createLichChieu(scheduleData) {
  const lichChieuList = getLichChieuList();
  lichChieuList.push(scheduleData);
  fs.writeFileSync(
    lichChieuFilePath,
    JSON.stringify(lichChieuList, null, 2),
    "utf-8"
  );
}

// Xóa lịch chiếu
function deleteLichChieu(index) {
  const lichChieuList = getLichChieuList();
  lichChieuList.splice(index, 1);
  fs.writeFileSync(
    lichChieuFilePath,
    JSON.stringify(lichChieuList, null, 2),
    "utf-8"
  );
}

module.exports = {
  getPhimList,
  getLichChieuList,
  createLichChieu,
  deleteLichChieu,
};
