const router = require("express").Router();
const express = require("express");
const {
  authUser,
  pertanyaanRoutes,
  gameRoutes,
  answerRoutes,
} = require("../api/routes");

router.use("/api/auth", authUser);
router.use("/api/pertanyaan", pertanyaanRoutes);
router.use("/api/game", gameRoutes);
router.use("/api/answer", answerRoutes);

module.exports = router;
