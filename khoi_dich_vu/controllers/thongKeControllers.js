const fs = require("fs");
const path = require("path");

const veDataPath = path.join(__dirname, "../du_lieu/ve.json");

const thongKeVe = (req, res) => {
  fs.readFile(veDataPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ success: false });

    const veList = JSON.parse(data);
    const tongVeDaBan = veList.reduce(
      (total, ve) => total + ve.so_luong_da_ban,
      0
    );
    res.json({ success: true, data: { tongVeDaBan } });
  });
};

module.exports = { thongKeVe };
