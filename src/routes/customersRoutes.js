import { Router } from "express";
import { getCustomer, getCustomers } from "../controllers/customerControllers.js";
import { validateCustomerId } from "../middlewares/validateCustomerId.js";

const customerRouter = Router();

customerRouter.get('/customers', getCustomers);
customerRouter.get('/customers/:id', validateCustomerId, getCustomer);

export default customerRouter;