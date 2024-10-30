// controllers/nhanVienController.js

const fs = require("fs");
const path = require("path");

const duongDanFile = path.join(__dirname, "../du_lieu/nhan_vien.json");

// Đọc tất cả nhân viên
exports.getAll = (req, res) => {
  fs.readFile(duongDanFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi đọc dữ liệu." });
    }
    res.json(JSON.parse(data));
  });
};

// Tạo nhân viên mới
exports.create = (req, res) => {
  const newNhanVien = req.body;
  fs.readFile(duongDanFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi đọc dữ liệu." });
    }
    const nhanVienList = JSON.parse(data);
    nhanVienList.push(newNhanVien);
    fs.writeFile(duongDanFile, JSON.stringify(nhanVienList, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi ghi dữ liệu." });
      }
      res.status(201).json(newNhanVien);
    });
  });
};

// Lấy nhân viên theo ID
exports.getById = (req, res) => {
  const { id } = req.params;
  fs.readFile(duongDanFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi đọc dữ liệu." });
    }
    const nhanVienList = JSON.parse(data);
    const nhanVien = nhanVienList.find((nv) => nv.id === id);
    if (!nhanVien) {
      return res.status(404).json({ message: "Nhân viên không tìm thấy." });
    }
    res.json(nhanVien);
  });
};

// Cập nhật nhân viên
exports.update = (req, res) => {
  const { id } = req.params;
  const updatedNhanVien = req.body;
  fs.readFile(duongDanFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi đọc dữ liệu." });
    }
    const nhanVienList = JSON.parse(data);
    const index = nhanVienList.findIndex((nv) => nv.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Nhân viên không tìm thấy." });
    }
    nhanVienList[index] = { ...nhanVienList[index], ...updatedNhanVien };
    fs.writeFile(duongDanFile, JSON.stringify(nhanVienList, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi ghi dữ liệu." });
      }
      res.json(nhanVienList[index]);
    });
  });
};

// Xóa nhân viên
exports.delete = (req, res) => {
  const { id } = req.params;
  fs.readFile(duongDanFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi đọc dữ liệu." });
    }
    let nhanVienList = JSON.parse(data);
    const index = nhanVienList.findIndex((nv) => nv.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Nhân viên không tìm thấy." });
    }
    nhanVienList = nhanVienList.filter((nv) => nv.id !== id);
    fs.writeFile(duongDanFile, JSON.stringify(nhanVienList, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi ghi dữ liệu." });
      }
      res.status(204).send();
    });
  });
};
