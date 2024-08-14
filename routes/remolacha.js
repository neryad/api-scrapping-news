import { Router } from "express";
import { getRemolachaNews } from "../controllers/remolacha.js";

const router = Router();

router.get("/", getRemolachaNews);

export default router;
