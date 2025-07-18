const { nanoid } = require("nanoid");
const { Answer, Skor, users } = require("../../models");
const { Sequelize } = require("sequelize");

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
  const { total_nilai, namaPemain, skorLumbung, gameId } = req.body;
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
      gameId,
    });

    res.status(201).json(skor);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menyimpan skor", error: err.message });
  }
};

const getRekapGrouped = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // 1. Ambil data dari tabel Answer
    const rawData = await Answer.findAll({
      attributes: [
        "gameId",
        "namaPemain",
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(`CASE WHEN "isCorrect" = true THEN 1 ELSE 0 END`)
          ),
          "benar",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(`CASE WHEN "isCorrect" = false THEN 1 ELSE 0 END`)
          ),
          "salah",
        ],
      ],
      group: ["gameId", "namaPemain"],
      order: [["gameId", "DESC"]],
      raw: true,
    });

    // 2. Ambil semua skor dari tabel Skor
    const allSkor = await Skor.findAll({ raw: true });

    // 3. Gabungkan berdasarkan gameId dan namaPemain
    const grouped = rawData.reduce((acc, item) => {
      const existing = acc.find((g) => g.gameId === item.gameId);

      // cari skor untuk pemain ini
      const skor = allSkor.find(
        (s) =>
          s.gameId === item.gameId && s.namaPemain === item.namaPemain
      );

      const playerData = {
        namaPemain: item.namaPemain,
        benar: parseInt(item.benar),
        salah: parseInt(item.salah),
        total_nilai: skor ? skor.total_nilai : 0,
        skorLumbung: skor ? skor.skorLumbung : 0,
      };

      if (existing) {
        existing.players.push(playerData);
      } else {
        acc.push({
          gameId: item.gameId,
          players: [playerData],
        });
      }

      return acc;
    }, []);

    const total = grouped.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedData = grouped.slice(offset, offset + limit);

    res.json({
      success: true,
      data: paginatedData,
      currentPage: page,
      totalPages,
      totalItems: total,
    });
  } catch (err) {
    console.error("DETAIL ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data rekapan.",
    });
  }
};

const deleteDataGame = async (req, res) => {
  const { gameId } = req.params;

  try {
    await Answer.destroy({
      where: { gameId },
    });
    await Skor.destroy({
      where: { gameId },
    });

    res.status(200).json({
      success: true,
      message: `Semua data untuk gameId ${gameId} berhasil dihapus.`,
    });
  } catch (error) {
    console.error("❌ Gagal hapus data game:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus data game.",
    });
  }
};

module.exports = {
  startGame,
  finishGame,
  saveSkor,
  getRekapGrouped,
  deleteDataGame
};
