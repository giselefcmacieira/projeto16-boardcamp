import Joi from "joi";

//body: {customerId: 1, gameId: 1, daysRented: 3}
const rentalSchema = Joi.object({
    customerId: Joi.number().integer().required(),
    gameId: Joi.number().integer().required(),
    daysRented: Joi.number().integer().greater(0).required()
})

export default rentalSchema