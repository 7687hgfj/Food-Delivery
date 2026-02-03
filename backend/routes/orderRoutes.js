import { Router } from "express";
import {
  assignNearestOrder,
  createOrder,
  getOrders
} from "../controllers/orderController.js";

const router = Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.post("/assign", assignNearestOrder);

export default router;
