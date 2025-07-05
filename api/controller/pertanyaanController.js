const { expression } = require("joi");
const { Pertanyaan } = require("../../models");
const pertanyaanValidation = require("../../validation/pertanyaan");

const createPertanyaan = async (req, res) => {
  try {
    const { errors } = pertanyaanValidation.validateCreatePayload(req.body);
    if (errors) {
      return res.status(400).json({ status: "error", errors });
    }

    const { soal, jawab_a, jawab_b, jawab_c, jawab_d, jawaban_benar, nilai } =
      req.body;

    const newSoal = await Pertanyaan.create({
      soal,
      jawab_a,
      jawab_b,
      jawab_c,
      jawab_d,
      jawaban_benar,
      nilai,
    });

    res.status(201).json({
      status: "201",
      message: "Tambah Data Berhasil",
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

const getPertanyaan = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const countPertanyaan = await Pertanyaan.count();

    const totalPage = Math.ceil(countPertanyaan / limit);

    const data = await Pertanyaan.findAll({
      limit: limit,
      offset: offset,
    });
    const result = data.map((Pertanyaan) => ({
      status: "success",
      data: {
        id: Pertanyaan.id,
        soal: Pertanyaan.soal,
        jawab_a: Pertanyaan.jawab_a,
        jawab_b: Pertanyaan.jawab_b,
        jawab_c: Pertanyaan.jawab_c,
        jawab_d: Pertanyaan.jawab_d,
        jawaban_benar: Pertanyaan.jawaban_benar,
        nilai: Pertanyaan.nilai,
      },
    }));
    res.status(200).json({
      data: result,
      meta: {
        page: parseInt(page),
        totalPage: totalPage,
        totalData: countPertanyaan,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPertanyaanById = async (req, res) => {
  try {
    const data = await Pertanyaan.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }

    const result = {
      status: "success",
      data: {
        soal: data.soal,
        jawab_a: data.jawab_a,
        jawab_b: data.jawab_b,
        jawab_c: data.jawab_c,
        jawab_d: data.jawab_d,
        jawaban_benar: data.jawaban_benar,
        nilai: data.nilai,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePertanyaan = async (req, res) => {
  try {
    const { errors } = pertanyaanValidation.validateUpdatePayload(req.body);
    if (errors) {
      return res.status(400).json({ errors });
    }

    const { id } = req.params;
    const { soal, jawab_a, jawab_b, jawab_c, jawab_d, jawaban_benar, nilai } =
      req.body;

    const [updated] = await Pertanyaan.update(
      {
        soal,
        jawab_a,
        jawab_b,
        jawab_c,
        jawab_d,
        jawaban_benar,
        nilai,
      },
      {
        where: { id },
      }
    );

    if (updated === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Data not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Update Data Successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const deletePertanyaan = async (req, res) => {
  try {
    const deletePertanyaan = await Pertanyaan.findByPk(req.params.id);

    if (!deletePertanyaan) {
      return res
        .status(404)
        .json({ status: "error", message: "Data not found" });
    }

    await Pertanyaan.destroy({ where: { id: req.params.id } });
    res.status(200).json({ status: "success", message: "Delete Berhasil" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

const getPertanyaanRandom = async (req, res) => {
  try {
    const count = await Pertanyaan.count();
    if (count === 0) {
      return res.status(404).json({ message: "Belum ada soal di database." });
    }

    const randomOffset = Math.floor(Math.random() * count);

    const soalList = await Pertanyaan.findAll({
      offset: randomOffset,
      limit: 1,
    });

    const soal = soalList[0];

    if (!soal) {
      return res.status(404).json({ message: "Soal tidak ditemukan." });
    }

    res.json(soal);
  } catch (err) {
    console.error("Gagal mengambil soal random:", err);
    res.status(500).json({ message: "Gagal mengambil soal." });
  }
};

module.exports = {
  createPertanyaan,
  deletePertanyaan,
  updatePertanyaan,
  getPertanyaanById,
  getPertanyaan,
  getPertanyaanRandom,
};
