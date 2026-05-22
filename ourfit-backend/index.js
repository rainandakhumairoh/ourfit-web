import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import productsRoute from "./routes/Products.js";
import authRoute from "./routes/Auth.js";
import User from "./models/User.js";
import "dotenv/config";


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // supaya gambar bisa diakses

// Routes
app.use("/api/products", productsRoute);
app.use("/api/auth", authRoute);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
