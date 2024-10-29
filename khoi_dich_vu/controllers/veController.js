const fs = require("fs");
const path = require("path");
const veDataPath = path.join(__dirname, "../du_lieu/ve.json");

exports.getVe = (req, res) => {
  fs.readFile(veDataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi đọc dữ liệu" });
    }
    res.json(JSON.parse(data));
  });
};

exports.addVe = (req, res) => {
  const newVe = req.body;
  fs.readFile(veDataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi đọc dữ liệu" });
    }
    const veList = JSON.parse(data);
    veList.push(newVe);
    fs.writeFile(veDataPath, JSON.stringify(veList), (err) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi ghi dữ liệu" });
      }
      res.status(201).json(newVe);
    });
  });
};
