import { db } from "../database/database.connection.js"

export async function validateUnicGame (req, res, next) {
    //formato dos dados no db: {id: 1, name: 'Banco Imobiliário', image: 'http://', stockTotal: 3, pricePerDay: 1500}
    try{
        const name = await db.query(`SELECT name FROM games WHERE name = $1;`, [req.body.name]);
        if(name.rowCount > 0){
            return res.sendStatus(409);
        }
        next();
    }catch(err){
        return res.status(500).send(err.message)
    }
}