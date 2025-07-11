const { nanoid } = require("nanoid");
const { Answer, Skor } = require("../../models");

// POST /game/start
const startGame = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "userId wajib diisi" });

  const gameId = nanoid(6);
  res.status(200).json({ gameId, message: "Game dimulai" });
};

// POST /game/finish
const finishGame = async (req, res) => {
  const { userId, gameId } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ message: "userId dan gameId wajib diisi" });
  }

  try {
    const jawabanBenar = await Answer.findAll({
      where: {
        userId,
        gameId,
        isCorrect: true,
      },
      include: {
        model: Pertanyaan,
        attributes: ["nilai"],
      },
    });

    const skorAkhir = jawabanBenar.reduce((total, item) => {
      return total + (item.Pertanyaan?.nilai || 0);
    }, 0);

    const tanggal = new Date();
    const score = await Skor.create({
      userId,
      tanggal,
      total_nilai: skorAkhir,
    });

    res.status(200).json({
      message: "Game selesai",
      score: skorAkhir,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const saveSkor = async (req, res) => {
  const userId = req.user.id;
  const { total_nilai,namaPemain,skorLumbung,gameId } = req.body;
  const tanggal = new Date(); 

  if (!total_nilai) {
    return res.status(400).json({ message: "Total nilai wajib diisi" });
  }

  try {
    const skor = await Skor.create({
      userId,
      total_nilai,
      tanggal,
      namaPemain,
      skorLumbung,
      gameId
    });

    res.status(201).json(skor);
  } catch (err) {
    res.status(500).json({ message: "Gagal menyimpan skor", error: err.message });
  }
};

module.exports = {
  startGame,
  finishGame,
  saveSkor,
};
