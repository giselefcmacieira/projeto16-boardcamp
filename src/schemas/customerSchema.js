import JoiDate from "@joi/date";
import Joi from "joi";

//body: {name: 'João Alfredo', phone: '21998899222', cpf: '01234567890', birthday: '1992-10-25'}

const customerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(11).required(),
    cpf: Joi.string().length(11).required(),
    birthday: Joi.extend(JoiDate).date().format('YYYY-MM-DD').required()
})

export default customerSchema