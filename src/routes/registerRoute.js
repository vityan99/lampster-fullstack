import express from "express";
import { newUser } from "../controllers/registerController.js";

const router = express.Router();

router.post("/addNewUser", newUser);

export default router;
