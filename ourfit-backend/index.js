import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import productsRoute from "./routes/Products.js";
import mixmatchRoute from "./routes/Mixmatch.js";
import bookmarkRoute from "./routes/Bookmark.js";
import favoriteRoute from "./routes/Favorite.js";
import personalizationRoute from "./routes/Personalization.js";
import authRoute from "./routes/Auth.js";
import User from "./models/User.js";
import "dotenv/config";


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://byourfit.id",
      "https://www.byourfit.id",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/products", productsRoute);
app.use("/api/auth", authRoute);
app.use("/api/mixmatch", mixmatchRoute);
app.use("/api/bookmarks", bookmarkRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/personalization", personalizationRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ourfit Backend is Running 🚀"
  });
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
export default app;
