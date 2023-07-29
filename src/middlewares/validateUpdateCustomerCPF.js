import { db } from "../database/database.connection.js";

//Formato de um cliente na tabela customers {id: 1, name: 'João Alfredo', phone: '21998899222', cpf: '01234567890', birthday: '1992-10-25'}
//body: {name: 'João Alfredo', phone: '21998899222', cpf: '01234567890', birthday: '1992-10-25'}
//params: {id: 1}

export async function validateUpdateCustomerCPF (req, res, next){
    const {cpf} = req.body;
    const {id} = req.params;
    try{
        const customer = await db.query(`SELECT id, cpf 
            FROM customers 
            WHERE cpf = $1 AND id <> $2;`, 
            [cpf, id]); //caso já tenha um cliente com esse cpf rowCount > 0 caso não tenha outro usuário com este cpf ou o cpf já pertence ao usuário que se deseja atualizar rowCount === 0
        if(customer.rowCount > 0){
            return res.sendStatus(409)
        }
        next()
    }catch(err){
        return res.status(500).send(err.message)
    }
}