const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { authMiddleware, adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/", authMiddleware, adminOnly, async (req, res) => {
  const newProduct = new Product({ ...req.body, createdBy: req.user.id });
  await newProduct.save();
  res.json(newProduct);
});

module.exports = router;
