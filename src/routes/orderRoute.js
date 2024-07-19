import express from "express";
import { getOrders } from "../controllers/getOrdersController.js";
import { createOrder } from "../controllers/createOrderController.js";
import { statusChange } from "../controllers/statusChangeController.js";

const router = express.Router();

router.get("/getOrders", getOrders);
router.post("/createOrder", createOrder);
router.post("/statusChange", statusChange);

export default router;
