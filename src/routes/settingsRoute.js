import express from "express";
import { getSettings } from "../controllers/getSettingsController.js";

const router = express.Router();

router.get("/getSettings", getSettings);

export default router;
