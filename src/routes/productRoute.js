import express from "express";
import { getProduct } from "../controllers/getProductController.js";

const router = express.Router();

router.get("/getProduct", getProduct);

export default router;
