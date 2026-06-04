import express from "express";
import Personalization from "../models/Personalization.js";

const router = express.Router();

// Simpan hasil
router.post("/", async (req, res) => {
  try {
    const personalization =
      await Personalization.findOneAndUpdate(
        {
          userId: req.body.userId,
        },
        req.body,
        {
          new: true,
          upsert: true,
        }
      );

    res.status(200).json({
      success: true,
      data: personalization,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Ambil hasil berdasarkan user
router.get("/:userId", async (req, res) => {
  try {
    const result = await Personalization.findOne({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// delete
router.delete("/:userId", async (req, res) => {
  try {
    await Personalization.deleteMany({
      userId: req.params.userId,
    });

    res.json({
      success: true,
      message: "Personalisasi berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;