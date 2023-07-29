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
    const {customer} = res.locals;
    return res.send(customer);
}

export async function addCustomer (req,res){
    //body: {name: 'João Alfredo', phone: '21998899222', cpf: '01234567890', birthday: '1992-10-25'}
    const {name, phone, cpf, birthday} = req.body;
    try{
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
            VALUES ($1, $2, $3, $4);`, 
            [name, phone, cpf, birthday])
        return res.sendStatus(201);
    }catch(err){
        return res.status(500).send(err.message)
    }
}