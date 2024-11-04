// khoi_dich_vu/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const authController = require("./controllers/authController");
const traCuuController = require("./controllers/traCuuController");
//const lapLichController = require("./controllers/lapLichController");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Để phục vụ các file tĩnh như HTML, CSS, JS

// Route đăng nhập
app.post("/login", authController.login);

// Route tra cứu
app.get("/tra_cuu", traCuuController.traCuu);

// Route lập lịch chiếu phim
//app.post("/lap_lich_chieu", lapLichController.lapLichChieu);

// Route lấy lịch chiếu
//app.get("/lich_chieu", lapLichController.getLichChieu);

// Route lấy danh sách phim
//app.get("/phim", lapLichController.getPhim);

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
