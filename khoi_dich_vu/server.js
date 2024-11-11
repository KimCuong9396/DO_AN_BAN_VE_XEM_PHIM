// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const authRoutes = require("./routes/authRoutes");
// const traCuuRoutes = require("./routes/traCuuRoutes");
// const lapLichRoutes = require("./routes/lapLichRoutes"); // Import routes
// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.static(path.join(__dirname, "../he_khach/giao_dien")));

// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/auth", authRoutes);
// app.use("/api", traCuuRoutes);
// app.use("/api/lapLich", lapLichRoutes);

// app.listen(PORT, () => {
//   console.log(`Server đang chạy tại http://localhost:${PORT}`);
// });
// server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lapLichRoutes = require("./routes/lapLichRoutes");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json()); // Để nhận dữ liệu JSON trong POST request
app.use(express.static("public")); // Để phục vụ tệp tĩnh như HTML, JS, CSS

// Đăng ký các route
app.use("/api/lapLich", lapLichRoutes);

// Chạy server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
