import mongoose from "mongoose";

const QuotationSchema = new mongoose.Schema(
  {
    saleExecutive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      default: "Valued Customer",
    },
    items: [
      {
        component: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ComponentModel",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("QuotationModel", QuotationSchema);
