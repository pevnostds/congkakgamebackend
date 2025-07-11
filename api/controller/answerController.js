const { Answer, Pertanyaan } = require("../../models");
const answerValidation = require("../../validation/answer/");

const jawabSoal = async (req, res) => {
  const { errors } = answerValidation.validateCreatePayload(req.body);
  if (errors) {
    return res.status(400).json({ status: "errors", errors: errors.details });
  }

  const { userId, questionId, jawaban, gameId, namaPemain } = req.body;


  try {
    // Cari soal
    const soal = await Pertanyaan.findByPk(questionId);
    if (!soal) {
      return res.status(404).json({ message: "Soal tidak ditemukan" });
    }

    let isCorrect = false;

    if (typeof jawaban === "string" && jawaban.trim() !== "") {
      isCorrect =
        jawaban.toLowerCase() === String(soal.jawaban_benar).toLowerCase();
    }
    // Simpan jawaban
    const data = await Answer.create({
      userId,
      questionId,
      jawaban,
      isCorrect,
      gameId,
      namaPemain,
    });

    res.status(201).json({
      message: "Jawaban berhasil disimpan",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  jawabSoal,
};
