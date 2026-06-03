import express from "express";
import Favorite from "../models/Favorite.js";

const router = express.Router();
// GET semua wishlist user
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const items = await Favorite.find({ userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cek apakah produk sudah di-wishlist
router.get("/", async (req, res) => {
  try {
    const { userId, productId } = req.query;
    const item = await Favorite.findOne({ userId, productId });
    res.json({ isWished: !!item, favoriteId: item?._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST tambah wishlist
router.post("/", async (req, res) => {
  try {
    const { userId, productId, name, price, image } = req.body;
    const existing = await Favorite.findOne({ userId, productId });
    if (existing) return res.json(existing); // sudah ada, return saja
    const item = new Favorite({ userId, productId, name, price, image });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE hapus dari wishlist
router.delete("/:productId", async (req, res) => {
  try {
    const { userId } = req.query;
    await Favorite.findOneAndDelete({ userId, productId: req.params.productId });
    res.json({ message: "Dihapus dari favorite" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;