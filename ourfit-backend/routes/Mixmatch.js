import express from "express";
import Mixmatch from "../models/Mixmatch.js";
import multer from "multer";

const router = express.Router();

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });

// CREATE MIXMATCH
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {

      const {
        title,
        description,
        category,
        products,
      } = req.body;

      const item = new Mixmatch({
        title,
        description,
        category,

        image: req.file
          ? `/uploads/${req.file.filename}`
          : "",

        products: Array.isArray(products)
          ? products
          : [products],
      });

      await item.save();

      res.status(201).json(item);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// GET ALL
router.get("/", async (req, res) => {
  try {

    const items =
      await Mixmatch.find()
        .populate("products");

    res.json(items);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// GET DETAIL
router.get("/:id", async (req, res) => {
  try {

    const item =
      await Mixmatch.findById(
        req.params.id
      ).populate("products");

    res.json(item);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// UPDATE MIXMATCH
router.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        products,
      } = req.body;

      const updateData = {
        title,
        description,
        category,
        products: Array.isArray(products)
          ? products
          : products
          ? [products]
          : [],
      };

      // jika upload gambar baru
      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      const item = await Mixmatch.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(item);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// DELETE MIXMATCH
router.delete("/:id", async (req, res) => {
  try {

    const item =
      await Mixmatch.findByIdAndDelete(
        req.params.id
      );

    if (!item) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    res.json({
      message: "Data berhasil dihapus",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
