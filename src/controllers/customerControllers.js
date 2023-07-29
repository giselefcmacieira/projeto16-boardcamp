import { db } from "../database/database.connection.js";

//Formato de um cliente na tabela customers {id: 1, name: 'João Alfredo', phone: '21998899222', cpf: '01234567890', birthday: '1992-10-25'}

export async function getCustomers (req, res){
    try{
        const customers = await db.query(`SELECT * FROM customers;`)
        const rightCustomers = customers.rows.map(customer => {
            return {
                id: customer.id,
                name: customer.name,
                phone: customer.phone, 
                cpf: customer.cpf,
                birthday: customer.birthday.toISOString().slice(0, 10)
            }
        });
        return res.send(rightCustomers)
    }catch(err){
        return res.status(500).send(err.message)
    }

}

export async function getCustomer (req, res){
    const {customer} = res.locals;
    const rightCustomer = customer.rows.map(customer => {
        return {
            id: customer.id,
            name: customer.name,
            phone: customer.phone, 
            cpf: customer.cpf,
            birthday: customer.birthday.toISOString().slice(0, 10)
        }
    });
    return res.send(rightCustomer[0]);
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

export async function updateCustomer (req, res){
    //body: {name: 'João Alfredo', phone: '21998899222', cpf: '01234567890', birthday: '1992-10-25'}
    //params: {id: 1}
    //UPDATE customers SET phone='31993265872', cpf='15489652315'  WHERE id = 1
    const {name, phone, cpf, birthday} = req.body;
    const {id} = req.params;
    try{
        await db.query(`UPDATE customers 
            SET name = $1, phone = $2, cpf = $3, birthday = $4 
            WHERE id = $5`, 
            [name, phone, cpf, birthday, id])
        return res.sendStatus(200)
    }catch(err){
        return res.status(500).send(err.message)
    }
}