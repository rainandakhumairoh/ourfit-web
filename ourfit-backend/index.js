import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productsRoute from "./routes/products.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // supaya gambar bisa diakses

// Routes
app.use("/api/products", productsRoute);

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ourfit-backend")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
