import express from "express";
import { getContactsPage } from "../controllers/contactsController.js";

const router = express.Router();

router.get("/", getContactsPage);

export default router;
