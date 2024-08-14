import { Router } from "express";
import { detailsExtractor } from "../controllers/details-extractor.js";

const router = Router();

router.post("/", detailsExtractor);

export default router;
