import { db } from "../database/database.connection.js";


export async function validateGameAvailability (req, res, next){
    //formato da tabela rentals: {id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee}
    //body: {customerId: 1, gameId: 1, daysRented: 3}
    const {gameInfo} = res.locals; //{pricePerDay: 35, stockTotal: 3}
    const {gameId} = req.body;
    try{
        const numberOfGamesRented = (await db.query(`SELECT id, "gameId" FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`, [gameId])).rowCount;
        if(numberOfGamesRented >= gameInfo.stockTotal){
            return res.sendStatus(400)
        }
        next();
    }catch(err){
        return res.status(500).send(err.message)
    }
}