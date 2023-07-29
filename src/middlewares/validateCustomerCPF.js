import { db } from "../database/database.connection.js";

//body: {name: 'João Alfredo', phone: '21998899222', cpf: '01234567890', birthday: '1992-10-25'}

export async function validateCustomerCPF(req, res, next){
    const {cpf} = req.body;
    const customer = await db.query(`SELECT cpf 
        FROM customers WHERE cpf = $1`,
        [cpf])
    if(customer.rowCount > 0){
        return res.sendStatus(409);
    }
    next();
}