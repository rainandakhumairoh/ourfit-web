import mongoose from "mongoose";

const personalizationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  name: String,

  smartFit: {
    BMI: Number,
    sizeCategory: String,
  },

  styleQuiz: {
    primary: String,
    mix: String,
    versatile: Boolean,
    undertone: String,
    scores: Object,
  },
},
{
  timestamps: true,
});

export default mongoose.model(
  "Personalization",
  personalizationSchema
);