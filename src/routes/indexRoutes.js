import { Router } from "express";
import gameRouter from "../routes/gameRoutes.js";
import customerRouter from "./customersRoutes.js";
import rentalRouter from "./rentalRoutes.js";

const router = Router();

router.use(gameRouter);
router.use(customerRouter);
router.use(rentalRouter);

export default router