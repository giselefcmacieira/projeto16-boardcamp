import { Router } from "express";
import { addRental, finishRental, getRentals } from "../controllers/rentalControllers.js";
import { validateGameAvailability } from "../middlewares/validateGameAvailability.js";
import { validateGameId } from "../middlewares/validateGameId.js";
import { validateRentingCustomer } from "../middlewares/validateRentingCustomer.js";
import { validateRentingGame } from "../middlewares/validateRentingGame.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import rentalSchema from "../schemas/rentalSchema.js";


const rentalRouter = Router();

rentalRouter.get('/rentals', getRentals);
rentalRouter.post('/rentals', validateRentingCustomer, validateRentingGame, validateGameAvailability, validateSchema(rentalSchema),addRental);
rentalRouter.post('/rentals/:id/return', validateGameId, finishRental);

export default rentalRouter;