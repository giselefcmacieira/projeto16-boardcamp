import { db } from "../database/database.connection.js"


export async function getGames (req, res){
    //formato dos dados no db: {id: 1, name: 'Banco Imobiliário', image: 'http://', stockTotal: 3, pricePerDay: 1500}
    try{
        const games = await db.query(`SELECT * FROM games;`);
        return res.send(games.rows)
    }catch(err){
        return res.status(500).send(err.message)
    }
}