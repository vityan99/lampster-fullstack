import express from "express";
import { getLogo } from "../controllers/getLogoController.js";

const router = express.Router();

router.get("/getLogo", getLogo);

export default router;
