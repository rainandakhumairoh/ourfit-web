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

    marketplaceLinks: {
      shopee: {
        type: String,
        default: ""
      },
      tiktok: {
        type: String,
        default: ""
      },
    },

    // COVER
    coverImage: {
      type: String,
      required: true,
    },

    // GALLERY
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);



const Product = mongoose.model("Product", productSchema);
export default Product;
