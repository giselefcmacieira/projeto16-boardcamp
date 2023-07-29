import { Router } from "express";
import { addRental, getRentals } from "../controllers/rentalControllers.js";
import { validateGameAvailability } from "../middlewares/validateGameAvailability.js";
import { validateRentingCustomer } from "../middlewares/validateRentingCustomer.js";
import { validateRentingGame } from "../middlewares/validateRentingGame.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import rentalSchema from "../schemas/rentalSchema.js";


const rentalRouter = Router();

rentalRouter.get('/rentals', getRentals);
rentalRouter.post('/rentals', validateRentingCustomer, validateRentingGame, validateGameAvailability, validateSchema(rentalSchema),addRental);

export default rentalRouter;