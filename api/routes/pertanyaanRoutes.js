const express = require("express");
const {
  createPertanyaan,
  getPertanyaan,
  getPertanyaanById,
  updatePertanyaan,
  deletePertanyaan,
  getPertanyaanRandom
} = require("../controller/pertanyaanController");
const { authMiddleware } = require("../../middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createPertanyaan);
router.get("/random", getPertanyaanRandom);
router.get("/data", getPertanyaan);
router.get("/:id", getPertanyaanById);
router.put("/:id", updatePertanyaan);
router.delete("/:id", deletePertanyaan);

module.exports = router;
