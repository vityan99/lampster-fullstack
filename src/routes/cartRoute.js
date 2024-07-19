import express from "express";
import { getCart } from "../controllers/getCartController.js";

const router = express.Router();

router.get("/getCart", getCart);

export default router;
