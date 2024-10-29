const fs = require("fs");
const path = require("path");

const veDataPath = path.join(__dirname, "../du_lieu/ve.json");

const layTatCaVe = (req, res) => {
  fs.readFile(veDataPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ success: false });

    const veList = JSON.parse(data);
    res.json({ success: true, data: veList });
  });
};

const datVe = (req, res) => {
  const { tenPhim, soLuong } = req.body;

  fs.readFile(veDataPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ success: false });

    const veList = JSON.parse(data);
    const ve = veList.find((v) => v.ten === tenPhim);

    if (ve && ve.so_luong_da_ban + soLuong <= ve.so_luong) {
      ve.so_luong_da_ban += soLuong;

      fs.writeFile(veDataPath, JSON.stringify(veList, null, 2), (err) => {
        if (err) return res.status(500).json({ success: false });

        return res.json({ success: true, message: "Đặt vé thành công" });
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Số vé không đủ" });
    }
  });
};

module.exports = { layTatCaVe, datVe };
