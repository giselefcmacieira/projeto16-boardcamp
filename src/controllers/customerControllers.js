import { db } from "../database/database.connection.js";

//Formato de um cliente na tabela customers {id: 1, name: 'João Alfredo', phone: '21998899222', cpf: '01234567890', birthday: '1992-10-25'}

export async function getCustomers (req, res){
    try{
        const customers = await db.query(`SELECT * FROM customers;`)
        return res.send(customers.rows)
    }catch(err){
        return res.status(500).send(err.message)
    }

}

export async function getCustomer (req, res){
    const {id} = req.params
    try{
        const costumer = await db.query(`SELECT * FROM customers
        WHERE id = $1`, 
        [id])
        return res.send(costumer.rows)
    }catch(err){
        return res.status(500).send(err.message)
    }
}