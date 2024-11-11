const express = require("express");
const router = express.Router();
const lapLichController = require("../controllers/lapLichController");

// API lấy danh sách phim
router.get("/getFilms", (req, res) => {
  const films = lapLichController.getPhimList();
  res.json(films);
});

// API lấy lịch chiếu
router.get("/getSchedules", (req, res) => {
  const schedules = lapLichController.getLichChieuList();
  res.json(schedules);
});

// API tạo lịch chiếu
router.post("/createSchedule", (req, res) => {
  const scheduleData = req.body;
  lapLichController.createLichChieu(scheduleData);
  res.json({ message: "Lập lịch thành công!" });
});

// API xóa lịch chiếu
router.delete("/deleteSchedule", (req, res) => {
  const { index } = req.body;
  lapLichController.deleteLichChieu(index);
  res.json({ message: "Xóa lịch chiếu thành công!" });
});

module.exports = router;
