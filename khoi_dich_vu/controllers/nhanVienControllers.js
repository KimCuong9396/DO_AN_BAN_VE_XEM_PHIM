const fs = require("fs");
const path = require("path");

const nhanVienDataPath = path.join(__dirname, "../du_lieu/nhan_vien.json");

const dangNhap = (req, res) => {
  const { username, password } = req.body;

  fs.readFile(nhanVienDataPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ success: false });

    const nhanVienList = JSON.parse(data);
    const nhanVien = nhanVienList.find(
      (nv) => nv.username === username && nv.password === password
    );

    if (nhanVien) {
      return res.json({ success: true, role: nhanVien.role });
    } else {
      return res.json({ success: false });
    }
  });
};

module.exports = { dangNhap };
