const express = require("express");
const router = express.Router();
const nhanVienController = require("../controllers/nhanVienController"); // Đảm bảo đường dẫn đúng

// Định nghĩa các route
router.get("/", nhanVienController.getAll);
router.post("/", nhanVienController.create);
router.get("/:id", nhanVienController.getById);
router.put("/:id", nhanVienController.update);
router.delete("/:id", nhanVienController.delete);

module.exports = router;
