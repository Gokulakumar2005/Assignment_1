import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "Processor",
        "RAM",
        "Storage",
        "Graphics Card",
        "Display",
        "Battery",
        "Keyboard",
        "Operating System",
      ],
    },

    name: {
      type: String,
      trim: true,
      required:true
    },

    description: {
      type: String,
      required:true
    },

    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    priceHistory: [
      {
        price: {
          type: Number,
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ComponentModel", componentSchema);