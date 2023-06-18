import mongoose from "mongoose";
import { Schema, models } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
