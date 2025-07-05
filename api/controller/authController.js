const { expression } = require("joi");
const { users } = require("../../models");
const authValidation = require("../../validation/auth");
require("dotenv/config");
const jwt = require("jsonwebtoken");

const signToken = (id, username, role) => {
  console.log(id, username, role);
  return jwt.sign({ id, username, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const reqisterUser = async (req, res) => {
  try {
    console.log(req.body)
    const { errors } = authValidation.validateCreatePayload(req.body);
    if (errors) {
      return res.status(400).json({ errors });
    }
    const { username, email, password, passwordConfirm, role } = req.body;
    if (password != passwordConfirm) {
      return res.status(400).json({
        message: "Password Tidak Sama",
      });
    }

    const cekEmail = await users.findOne({ where: { email: email } });
    if (cekEmail) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    const newUser = await users.create({
      username,
      email,
      password,
      role,
    });

    const token = signToken(newUser.id, newUser.username, newUser.role);
    console.log(token);
    return res.status(201).json({
      message: "Registration Berhasil",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Registration Gagal",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: "Fail",
        message: "Email dan Password wajib diisi",
        errors: "Email dan password tidak boleh kosong",
      });
    }

    const userLogin = await users.findOne({ where: { email: req.body.email } });
    if (!userLogin || !(await userLogin.cekPassword(req.body.password))) {
      return res.status(401).json({
        status: "Fail",
        message: "Email atau password salah",
        errors: "Periksa kembali email atau password Anda",
      });
    }

    const token = signToken(userLogin.id, userLogin.username, userLogin.role);

    return res.status(200).json({
      status: "Success",
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Terjadi kesalahan server",
      errors: error.message,
    });
  }
};

module.exports = {
  reqisterUser,
  loginUser,
};
