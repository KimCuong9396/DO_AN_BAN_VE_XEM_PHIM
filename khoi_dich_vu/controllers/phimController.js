const fs = require("fs");
const path = require("path");
const phimDataPath = path.join(__dirname, "../du_lieu/phim.json");

exports.getPhim = (req, res) => {
  fs.readFile(phimDataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi đọc dữ liệu" });
    }
    res.json(JSON.parse(data));
  });
};

exports.addPhim = (req, res) => {
  const newPhim = req.body;
  fs.readFile(phimDataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi đọc dữ liệu" });
    }
    const phimList = JSON.parse(data);
    phimList.push(newPhim);
    fs.writeFile(phimDataPath, JSON.stringify(phimList), (err) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi ghi dữ liệu" });
      }
      res.status(201).json(newPhim);
    });
  });
};
