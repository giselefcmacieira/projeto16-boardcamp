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

export async function addGames (req, res){
    //body: {name: 'Banco Imobiliário', image: 'http://www.imagem.com.br/jogo.jpg', stockTotal: 3, pricePerDay: 1500}
    const {name, image, stockTotal, pricePerDay} = req.body;
    //console.log(name, image, stockTotal, pricePerDay);
    try{
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
        VALUES ($1, $2, $3, $4);`, 
        [name, image, stockTotal, pricePerDay])
        return res.sendStatus(201)
    }catch(err){
        return response.status(500).send(err.message)
    }
}