// controllers/testController.js
const fs = require("fs");
const path = require("path");

exports.getFilms = (req, res) => {
  const filePath = path.join(__dirname, "../du_lieu/phim.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Không thể đọc dữ liệu phim" });
    }
    const films = JSON.parse(data);
    res.json(films);
  });
};
