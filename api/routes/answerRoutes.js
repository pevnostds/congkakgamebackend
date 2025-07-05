const express = require("express");
const { jawabSoal } = require("../controller/answerController");
const { authMiddleware } = require("../../middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", jawabSoal);

module.exports = router;
