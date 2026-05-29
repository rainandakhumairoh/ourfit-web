import express from "express";
import Product from "../models/Product.js";
import multer from "multer";

const router = express.Router();

// STORAGE
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

// MULTIPLE FIELD
const uploadFields = upload.fields([
  {
    name: "coverImage",
    maxCount: 1,
  },

  {
    name: "images",
    maxCount: 20,
  },
]);

// CREATE PRODUCT
router.post(
  "/",
  uploadFields,
  async (req, res) => {
    try {

      console.log(req.files);
      console.log(req.body);

      const {
        name,
        price,
        category,
        description,
      } = req.body;

      const coverImage =
        req.files?.coverImage?.[0]
          ? `/uploads/${req.files.coverImage[0].filename}`
          : "";

      const images =
        req.files?.images
          ? req.files.images.map(
              (file) =>
                `/uploads/${file.filename}`
            )
          : [];

      const product = new Product({
        name,
        price,
        category,
        description,
        coverImage,
        images,
      });

      const savedProduct =
        await product.save();

      res.status(201).json(savedProduct);

    } catch (err) {

      console.log("POST ERROR:");
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

    const products =
      await Product.find().sort({
        createdAt: -1,
      });

    res.json(products);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
});

// GET DETAIL
router.get("/:id", async (req, res) => {
  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// UPDATE
router.put(
  "/:id",
  uploadFields,
  async (req, res) => {
    try {

      const {
        name,
        price,
        category,
        description,
      } = req.body;

      const updateData = {
        name,
        price,
        category,
        description,
      };

      // COVER
      if (
        req.files?.coverImage?.[0]
      ) {
        updateData.coverImage =
          `/uploads/${req.files.coverImage[0].filename}`;
      }

      // GALLERY
      if (req.files?.images) {
        updateData.images =
          req.files.images.map(
            (file) =>
              `/uploads/${file.filename}`
          );
      }

      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true }
        );

      res.json(updatedProduct);

    } catch (err) {

      console.log("PUT ERROR:");
      console.log(err);

      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// DELETE
router.delete("/:id", async (req, res) => {
  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
