import { db } from "../database/database.connection.js";


export async function getRentals (req, res){
    //formato da tabela rentals: {id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee}
    try{
        const rentals = await db.query(`SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName"
            FROM rentals
            JOIN games ON rentals."gameId" = games.id 
            JOIN customers ON rentals."customerId" = customers.id`);
        const rightRentals = rentals.rows.map(rental => {
            let returnDate = null; 
            if(rental.returnDate !== null){
                returnDate = rental.returnDate.toISOString().slice(0,10)
            }
            return {
                id: rental.id,
                customerId: rental.customerId,
                gameId: rental.gameId,
                rentDate: rental.rentDate.toISOString().slice(0,10),
                daysRented: rental.daysRented,
                returnDate: returnDate,
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

export async function addRental (req, res) {
    //formato da tabela rentals: {id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee}
    //body: {customerId: 1, gameId: 1, daysRented: 3}
    //rentDate: data atual no momento da inserção.
    //originalPrice: daysRented multiplicado pelo preço por dia do jogo no momento da inserção.
    //Ao inserir um aluguel, os campos returnDate e delayFee devem sempre começar como null.
    //INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES (1, 1, '2021-06-20', 3, '2021-06-22', 4500, 0)
    const {customerId, gameId, daysRented} = req.body;
    const rentDate = new Date();
    const returnDate = null;
    const delayFee = null;
    const {gameInfo} = res.locals
    try{
        const originalPrice = daysRented * gameInfo.pricePerDay;
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`, 
            [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
        return res.sendStatus(201);
    }catch(err){
        return res.status(500).send(err.message)
    }
}