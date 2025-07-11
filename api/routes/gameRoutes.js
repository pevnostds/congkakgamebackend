const express = require("express");
const {
  startGame,
  finishGame,
  saveSkor,
  getHasil,
} = require("../controller/gameController");
const { authMiddleware } = require("../../middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/start", startGame);
router.post("/finish", finishGame);
router.post("/skors",saveSkor);
router.get("/hasil",getHasil);

module.exports = router;
