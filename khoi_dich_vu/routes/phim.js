const express = require("express");
const router = express.Router();
const phimController = require("../controllers/phimController");

// Định nghĩa các route cho phim
router.get("/", phimController.getAll);
router.post("/", phimController.create);
router.get("/:id", phimController.getById);
router.put("/:id", phimController.update);
router.delete("/:id", phimController.delete);

module.exports = router;
