import { Router } from "express";
import { checkHealth } from "../controllers/health.js";

const router = Router();

router.get("/", checkHealth);

export default router;
