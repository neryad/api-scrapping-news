import { Router } from "express";
import { getHoyNews } from "../controllers/hoy.js";

const router = Router();

router.get("/", getHoyNews);

export default router;
