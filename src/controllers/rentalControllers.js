import { db } from "../database/database.connection.js";


export async function getRentals (req, res){
    //formato da tabela rentals: {id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee}
    try{
        const rentals = await db.query(`SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName"
            FROM rentals
            JOIN games ON rentals."gameId" = games.id 
            JOIN customers ON rentals."customerId" = customers.id`);
        const rightRentals = rentals.rows.map(rental => {
            return {
                id: rental.id,
                customerId: rental.customerId,
                gameId: rental.gameId,
                rentDate: rental.rentDate.toISOString().slice(0, 10),
                daysRented: rental.daysRented,
                returnDate: rental.returnDate.toISOString().slice(0, 10),
                originalPrice: rental.originalPrice,
                delayFee: rental.delayFee,
                customer: {
                    id: rental.customerId,
                    name: rental.customerName
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName
                }
            }
        })
        res.send(rightRentals)
    }catch(err){
        return res.status(500).send(err.message);
    }
}