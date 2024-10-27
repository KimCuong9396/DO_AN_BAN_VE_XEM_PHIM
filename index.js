const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Đọc dữ liệu từ JSON
const loadData = (path) => {
  const data = fs.readFileSync(path, "utf-8");
  return JSON.parse(data);
};

// API lấy danh sách TV
app.get("/api/tivi", (req, res) => {
  const data = loadData("./dữ liệu/ti vi/tivi1.json");
  res.json(data);
});

// API lấy thông tin TV theo mã số
app.get("/api/tivi/:id", (req, res) => {
  const id = req.params.id;
  const data = loadData("./dữ liệu/ti vi/tivi1.json");
  const tivi = data.find((item) => item.Ma_so === id);
  if (tivi) {
    res.json(tivi);
  } else {
    res.status(404).send("Không tìm thấy TV!");
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
