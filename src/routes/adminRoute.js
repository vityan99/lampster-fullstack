import express from "express";
import { getAdminPage } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", getAdminPage);

export default router;
