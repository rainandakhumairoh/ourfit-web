import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String, // simpan nama file / URL
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
