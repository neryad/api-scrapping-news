import { Router } from "express";
import { getNuevoDiarioNews } from "../controllers/nuevoDiario.js";

const router = Router();

router.get("/", getNuevoDiarioNews);

export default router;
