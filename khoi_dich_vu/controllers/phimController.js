const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../du_lieu/phim.json");

// Đọc dữ liệu từ file JSON
const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Ghi dữ liệu vào file JSON
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Lấy tất cả phim
exports.getAll = (req, res) => {
  const phim = readData();
  res.json(phim);
};

// Tạo phim mới
exports.create = (req, res) => {
  const phim = readData();
  const newPhim = { id: Date.now(), ...req.body };
  phim.push(newPhim);
  writeData(phim);
  res.status(201).json(newPhim);
};

// Lấy phim theo ID
exports.getById = (req, res) => {
  const phim = readData();
  const foundPhim = phim.find((p) => p.id == req.params.id);
  if (foundPhim) {
    res.json(foundPhim);
  } else {
    res.status(404).send("Phim không tồn tại");
  }
};

// Cập nhật phim
exports.update = (req, res) => {
  const phim = readData();
  const foundIndex = phim.findIndex((p) => p.id == req.params.id);
  if (foundIndex !== -1) {
    phim[foundIndex] = { id: phim[foundIndex].id, ...req.body };
    writeData(phim);
    res.json(phim[foundIndex]);
  } else {
    res.status(404).send("Phim không tồn tại");
  }
};

// Xóa phim
exports.delete = (req, res) => {
  const phim = readData();
  const filteredPhim = phim.filter((p) => p.id != req.params.id);
  if (filteredPhim.length === phim.length) {
    res.status(404).send("Phim không tồn tại");
  } else {
    writeData(filteredPhim);
    res.status(204).send();
  }
};
