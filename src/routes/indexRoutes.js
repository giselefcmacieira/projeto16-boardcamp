import { Router } from "express";
import gameRouter from "../routes/gameRoutes.js";

const router = Router();

router.use(gameRouter);

export default router