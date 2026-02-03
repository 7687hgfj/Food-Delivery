import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    restaurantName: {
      type: String,
      required: true,
      trim: true
    },
    itemCount: {
      type: Number,
      required: true,
      min: 1
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    deliveryDistance: {
      type: Number,
      required: true,
      min: 0.1
    },
    assigned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
