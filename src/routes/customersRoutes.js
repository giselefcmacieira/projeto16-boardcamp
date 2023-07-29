import { Router } from "express";
import { addCustomer, getCustomer, getCustomers } from "../controllers/customerControllers.js";
import { validateCustomerCPF } from "../middlewares/validateCustomerCPF.js";
import { validateCustomerId } from "../middlewares/validateCustomerId.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import customerSchema from "../schemas/customerSchema.js";

const customerRouter = Router();

customerRouter.get('/customers', getCustomers);
customerRouter.get('/customers/:id', validateCustomerId, getCustomer);
customerRouter.post('/customers', validateSchema(customerSchema), validateCustomerCPF, addCustomer);

export default customerRouter;