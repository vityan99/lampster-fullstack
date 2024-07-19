import express from "express";
import { userPasswordChange } from "../controllers/passwordChangeController.js";

const router = express.Router();

router.post("/userPasswordChange", userPasswordChange);

export default router;
