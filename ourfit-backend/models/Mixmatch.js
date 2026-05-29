import mongoose from "mongoose";

const mixmatchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    category: { 
        type: String, 
        required: true, 
    },

    image: {
      type: String,
      required: true,
    },

    // RELASI KE PRODUCT
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Mixmatch = mongoose.model(
  "Mixmatch",
  mixmatchSchema
);

export default Mixmatch;

