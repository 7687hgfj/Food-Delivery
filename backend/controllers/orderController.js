import crypto from "crypto";
import Order from "../models/Order.js";

const isPositiveNumber = (value) => Number.isFinite(value) && value > 0;

export function getOrders(req, res) {
  Order.find().sort({ createdAt: -1 }).lean()
    .then((orders) => res.json(orders))
    .catch(() => res.status(500).json({ message: "Failed to fetch orders." }));
}

export function createOrder(req, res) {
  const { restaurantName, itemCount, isPaid, deliveryDistance } = req.body;

  if (!restaurantName || !restaurantName.trim()) {
    return res.status(400).json({ message: "Restaurant name is required." });
  }

  if (!isPositiveNumber(Number(itemCount))) {
    return res.status(400).json({ message: "Item count must be a positive number." });
  }

  if (!isPositiveNumber(Number(deliveryDistance))) {
    return res.status(400).json({ message: "Delivery distance must be a positive number." });
  }

  const order = new Order({
    orderId: crypto.randomUUID(),
    restaurantName: restaurantName.trim(),
    itemCount: Number(itemCount),
    isPaid: Boolean(isPaid),
    deliveryDistance: Number(deliveryDistance),
    assigned: false
  });

  order.save()
    .then((saved) => res.status(201).json(saved))
    .catch((error) => {
      if (error?.code === 11000) {
        return res.status(409).json({ message: "Order ID already exists. Please retry." });
      }
      return res.status(500).json({ message: "Failed to create order." });
    });
}

export function assignNearestOrder(req, res) {
  const maxDistance = Number(req.body?.maxDistance);

  if (!isPositiveNumber(maxDistance)) {
    return res.status(400).json({ message: "Max distance must be a positive number." });
  }

  return Order.findOneAndUpdate(
    {
      isPaid: false,
      assigned: false,
      deliveryDistance: { $lte: maxDistance }
    },
    { $set: { assigned: true } },
    { sort: { deliveryDistance: 1 }, new: true }
  )
    .lean()
    .then((assigned) => {
      if (!assigned) {
        return res.json({ message: "No order available" });
      }
      return res.json(assigned);
    })
    .catch(() => res.status(500).json({ message: "Failed to assign order." }));
}
