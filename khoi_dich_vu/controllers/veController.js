const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../du_lieu/ve.json");

// Đọc dữ liệu từ file JSON
const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Ghi dữ liệu vào file JSON
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Lấy tất cả vé
exports.getAll = (req, res) => {
  const ve = readData();
  res.json(ve);
};

// Tạo vé mới
exports.create = (req, res) => {
  const ve = readData();
  const newVe = { id: Date.now(), ...req.body };
  ve.push(newVe);
  writeData(ve);
  res.status(201).json(newVe);
};

// Lấy vé theo ID
exports.getById = (req, res) => {
  const ve = readData();
  const foundVe = ve.find((v) => v.id == req.params.id);
  if (foundVe) {
    res.json(foundVe);
  } else {
    res.status(404).send("Vé không tồn tại");
  }
};

// Cập nhật vé
exports.update = (req, res) => {
  const ve = readData();
  const foundIndex = ve.findIndex((v) => v.id == req.params.id);
  if (foundIndex !== -1) {
    ve[foundIndex] = { id: ve[foundIndex].id, ...req.body };
    writeData(ve);
    res.json(ve[foundIndex]);
  } else {
    res.status(404).send("Vé không tồn tại");
  }
};

// Xóa vé
exports.delete = (req, res) => {
  const ve = readData();
  const filteredVe = ve.filter((v) => v.id != req.params.id);
  if (filteredVe.length === ve.length) {
    res.status(404).send("Vé không tồn tại");
  } else {
    writeData(filteredVe);
    res.status(204).send();
  }
};
