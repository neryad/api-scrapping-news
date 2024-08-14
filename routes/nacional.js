import { Router } from "express";
import { getNacionalNews } from "../controllers/nacional.js";

const router = Router();

router.get("/", getNacionalNews);

export default router;
