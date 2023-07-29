import { db } from "../database/database.connection.js";
import idSchema from "../schemas/idSchema.js";

export async function validateCustomerId (req, res, next){
    const {id} = req.params;
    const validation = idSchema.validate(req.params, {abortEarly: false}); 
    if(validation.error){
        return res.status(400).send(validation.error.details[0].message)
    }
    try{
        const customer = await db.query(`SELECT * FROM customers
        WHERE id = $1`, 
        [id])
        if(customer.rowCount === 0){
            return res.sendStatus(404)
        }
        res.locals.customer = customer;
        next();
    }catch(err){
        return res.status(500).send(err.message)
    }
}