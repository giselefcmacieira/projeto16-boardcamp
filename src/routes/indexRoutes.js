import { Router } from "express";
import gameRouter from "../routes/gameRoutes.js";
import customerRouter from "./customersRoutes.js";

const router = Router();

router.use(gameRouter);
router.use(customerRouter);

export default router