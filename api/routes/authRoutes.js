const express = require("express");
const router = express.Router();
const { reqisterUser, loginUser } = require("../controller/authController");
const { authMiddleware } = require("../../middleware");

router.post("/register", reqisterUser);
router.post("/login", loginUser);
router.get("/verify-token", authMiddleware, (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Token valid, akses diterima.",
    user: req.user,
  });
});
module.exports = router;
