import { db } from "../database/database.connection.js";

export async function validateDeleteRentalId (req, res, next){
    //formato da tabela rentals: {id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee}
    //games: {id: 1, name: 'Banco Imobiliário', image: 'http://', stockTotal: 3, pricePerDay: 1500}
    //body: {}
    //params: {id: rentalId}
    const {id} = req.params;
    try{
        const rental = await db.query(`SELECT rentals."rentDate", rentals."returnDate"
            FROM rentals 
            WHERE id = $1;`, [id]);
        if(rental.rowCount === 0){
            return res.sendStatus(404)
        }
        if(rental.rows[0].returnDate === null){
            return res.sendStatus(400)
        }
        res.locals.rental = rental.rows[0] //{rentDate: 2021-06-20T03:00:00.000Z, returnDate}
        next();
    }catch(err){
        return res.status(500).send(err.message)
    }
}