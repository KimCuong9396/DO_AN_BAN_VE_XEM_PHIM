const express = require("express");
const app = express();
const nhanVienRoutes = require("./routes/nhan_vien");
const phimRoutes = require("./routes/phim");
const veRoutes = require("./routes/ve");
const thongKeRoutes = require("./routes/thong_ke");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sử dụng các route
app.use("/api/nhan_vien", nhanVienRoutes);
app.use("/api/phim", phimRoutes);
app.use("/api/ve", veRoutes);
app.use("/api/thong_ke", thongKeRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
