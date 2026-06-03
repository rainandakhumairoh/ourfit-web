import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
{
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  name: String,
  price: Number,
  image: String,
}, { timestamps: true });

favoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);