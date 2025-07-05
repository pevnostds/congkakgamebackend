const jwt = require("jsonwebtoken");

const {users} = require("../models");

  const authMiddleware = async (req, res, next) => {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) { 
        return res.status(401).json({
          status: 401,
          message: "Akses Anda Ditolak. Silakan Login/Register.",
        });
      }
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await users.findByPk(decode.id);
      if (!currentUser) {
        return res.status(403).json({
          status: 403,
          message: "Pengguna tidak ditemukan.",
        });
      }
      req.user = {
        id: currentUser.id,
        username: currentUser.username,
        role: currentUser.role,
      };
      next();
    } catch (error) {
      res.status(401).json({
        status: 401,
        error: error.message,
      });
    }
  };

module.exports = { authMiddleware };
