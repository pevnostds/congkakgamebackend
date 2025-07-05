const express = require("express");
const {
  startGame,
  finishGame,
  saveSkor,
} = require("../controller/gameController");
const { authMiddleware } = require("../../middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/start", startGame);
router.post("/finish", finishGame);
router.post("/skors",saveSkor);

module.exports = router;
