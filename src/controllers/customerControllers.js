import { db } from "../database/database.connection.js";


export async function getCustomers (req, res){
    //Formato de um cliente na tabela customers {id: 1, name: 'João Alfredo', phone: '21998899222', cpf: '01234567890', birthday: '1992-10-25'}
    try{
        const customers = await db.query(`SELECT * FROM customers;`)
        return res.send(customers.rows)
    }catch(err){
        return res.status(500).send(err.message)
    }

}