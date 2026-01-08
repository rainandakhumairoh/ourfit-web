import express from "express";
import Product from "../models/Product.js";
import multer from "multer";

const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// 🔹 CREATE Product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const product = new Product({ title, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 READ All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 UPDATE Product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const updateData = { title, price };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 DELETE Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
