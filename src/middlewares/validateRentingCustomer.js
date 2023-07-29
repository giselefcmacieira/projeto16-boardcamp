import { db } from "../database/database.connection.js";


export async function validateRentingCustomer (req, res, next){
    //body: {customerId: 1, gameId: 1, daysRented: 3}
    const {customerId} = req.body;
    try{
        const customer = await db.query(`SELECT name 
            FROM customers 
            WHERE id = $1`, 
            [customerId])
        if(customer.rowCount === 0){
            return res.sendStatus(400)
        }
        next();
    }catch(err){
        return res.status(500).send(err.message)
    }
}