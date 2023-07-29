import { Router } from "express";
import { getCustomers } from "../controllers/customerControllers.js";

const customerRouter = Router();

customerRouter.get('/customers', getCustomers);

export default customerRouter;