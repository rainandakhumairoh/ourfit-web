import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // path gambar
});

export default mongoose.model("Product", productSchema);
