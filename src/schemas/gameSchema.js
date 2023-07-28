import Joi from "joi";
//{name: 'Banco Imobiliário', image: 'http://www.imagem.com.br/jogo.jpg', stockTotal: 3, pricePerDay: 1500}
export const gameSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().integer().greater(0),
    pricePerDay: Joi.number().greater(0)
});