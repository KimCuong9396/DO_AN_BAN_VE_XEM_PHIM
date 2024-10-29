const fs = require("fs");
const path = require("path");

const phimDataPath = path.join(__dirname, "../du_lieu/phim.json");

const layTatCaPhim = (req, res) => {
  fs.readFile(phimDataPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ success: false });

    const phimList = JSON.parse(data);
    res.json({ success: true, data: phimList });
  });
};

const layPhimTheoId = (req, res) => {
  const { id } = req.params;

  fs.readFile(phimDataPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ success: false });

    const phimList = JSON.parse(data);
    const phim = phimList.find((p) => p.id == id);

    if (phim) {
      return res.json({ success: true, data: phim });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Phim không tồn tại" });
    }
  });
};

module.exports = { layTatCaPhim, layPhimTheoId };
