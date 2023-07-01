import mongoose from "mongoose";
import { Schema, models } from "mongoose";

const OrdertSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrdertSchema);
