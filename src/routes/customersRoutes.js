import { Router } from "express";
import { getCustomer, getCustomers } from "../controllers/customerControllers.js";

const customerRouter = Router();

customerRouter.get('/customers', getCustomers);
customerRouter.get('/customers/:id', getCustomer);

export default customerRouter;