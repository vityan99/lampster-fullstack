import express from "express";
import { getFilter } from "../controllers/getFilterController.js";

const router = express.Router();

router.get("/getFilter", getFilter);

export default router;
