import { db } from "../database/database.connection.js";

export async function validateRentingGame (req, res, next) {
    //body: {customerId: 1, gameId: 1, daysRented: 3}
    const {gameId} = req.body;
    try{
        const gameInfo = await db.query(`SELECT "pricePerDay", "stockTotal" FROM games WHERE id = $1`, [gameId]);
        if(gameInfo.rowCount === 0){
            return res.sendStatus(400)
        }
        res.locals.gameInfo = gameInfo.rows[0] //{pricePerDay: 35, stockTotal: 3}
        //return res.send(gamePricePerDay.rows[0]);
        next();
    }catch(err){
        return res.status(500).send(err.message)
    }
}