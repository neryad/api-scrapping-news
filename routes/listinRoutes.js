import { Router } from "express";
import { getListinNews } from "../controllers/listin.js";

const router = Router();

router.get("/", getListinNews);

export default router;
