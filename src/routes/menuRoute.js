import express from "express";
import { getMenu } from "../controllers/getMenuController.js";

const router = express.Router();

router.get("/getMenu", getMenu);

export default router;
