const express = require("express");
const router = express.Router();
const veController = require("../controllers/veController");

// Định nghĩa các route cho vé
router.get("/", veController.getAll);
router.post("/", veController.create);
router.get("/:id", veController.getById);
router.put("/:id", veController.update);
router.delete("/:id", veController.delete);

module.exports = router;
