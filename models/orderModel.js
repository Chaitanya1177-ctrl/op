import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    paymentId: { type: String },
    totalAmount: { type: Number },
    buyer: { type: mongoose.ObjectId, ref: "users" },
    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
