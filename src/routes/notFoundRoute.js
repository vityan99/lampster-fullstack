import express from "express";
import { getNotFoundPage } from "../controllers/notFoundController.js";

const router = express.Router();

router.use(getNotFoundPage);

export default router;
