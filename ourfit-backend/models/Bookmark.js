import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    mixmatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MixMatch",
      required: true,
    },
    title: { type: String },
    image: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

// Cegah duplikat bookmark
bookmarkSchema.index({ userId: 1, mixmatchId: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);