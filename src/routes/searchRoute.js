import express from "express";
import { getSearch } from "../controllers/getSearchController.js";

const router = express.Router();

router.get("/getSearch", getSearch);

export default router;
