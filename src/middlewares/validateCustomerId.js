import { db } from "../database/database.connection.js";

export async function validateCustomerId (req, res, next){
    const {id} = req.params
    try{
        const customer = await db.query(`SELECT * FROM customers
        WHERE id = $1`, 
        [id])
        console.log(customer.rowCount);
        if(customer.rowCount === 0){
            return res.sendStatus(404)
        }
        res.locals.customer = customer.rows;
        next();
    }catch(err){
        return res.status(500).send(err.message)
    }
}