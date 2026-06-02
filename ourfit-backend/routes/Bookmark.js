import express from "express";
import Bookmark from "../models/Bookmark.js";

const router = express.Router();

// GET /api/bookmarks?userId=xxx
// Ambil semua bookmark milik user
router.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "userId wajib diisi" });

  try {
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil bookmark", error: err.message });
  }
});

// POST /api/bookmarks
// Tambah bookmark baru
router.post("/", async (req, res) => {
  const { userId, mixmatchId, title, image, category } = req.body;

  if (!userId || !mixmatchId) {
    return res.status(400).json({ message: "userId dan mixmatchId wajib diisi" });
  }

  try {
    const bookmark = new Bookmark({ userId, mixmatchId, title, image, category });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    // Duplicate key → sudah di-bookmark sebelumnya
    if (err.code === 11000) {
      return res.status(409).json({ message: "Sudah di-bookmark" });
    }
    res.status(500).json({ message: "Gagal menyimpan bookmark", error: err.message });
  }
});

// DELETE /api/bookmarks/:mixmatchId?userId=xxx
// Hapus bookmark berdasarkan userId + mixmatchId
router.delete("/:mixmatchId", async (req, res) => {
  const { mixmatchId } = req.params;
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ message: "userId wajib diisi" });

  try {
    const deleted = await Bookmark.findOneAndDelete({ userId, mixmatchId });
    if (!deleted) return res.status(404).json({ message: "Bookmark tidak ditemukan" });
    res.json({ message: "Bookmark dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus bookmark", error: err.message });
  }
});

export default router;