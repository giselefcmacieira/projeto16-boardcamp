import { Router } from "express";
import { addRental, deleteRental, finishRental, getRentals } from "../controllers/rentalControllers.js";
import { validateDeleteRentalId } from "../middlewares/validateDeleteRentalId.js";
import { validateGameAvailability } from "../middlewares/validateGameAvailability.js";
import { validateRentalId } from "../middlewares/validateRentalId.js";
import { validateRentingCustomer } from "../middlewares/validateRentingCustomer.js";
import { validateRentingGame } from "../middlewares/validateRentingGame.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import rentalSchema from "../schemas/rentalSchema.js";


const rentalRouter = Router();

rentalRouter.get('/rentals', getRentals);
rentalRouter.post('/rentals', validateRentingCustomer, validateRentingGame, validateGameAvailability, validateSchema(rentalSchema),addRental);
rentalRouter.post('/rentals/:id/return', validateRentalId, finishRental);
rentalRouter.delete('/rentals/:id', validateDeleteRentalId, deleteRental)

export default rentalRouter;