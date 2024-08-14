import { Router } from "express";
import { getDiarioLibreNews } from "../controllers/diarioLibre.js";

const router = Router();

router.get("/", getDiarioLibreNews);

export default router;
