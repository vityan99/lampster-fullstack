import express from "express";
import { getClientPage } from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getClientPage);

export default router;
