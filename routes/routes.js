import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    ok: true,
    data: "Calentando el stream",
  });
});

export default router;
