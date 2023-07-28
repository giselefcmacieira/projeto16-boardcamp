import { Router } from "express"
import { addGames, getGames } from "../controllers/gameControllers.js"
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateUnicGame } from "../middlewares/validateUnicGame.js";
import { gameSchema } from "../schemas/gameSchema.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", validateSchema(gameSchema), validateUnicGame, addGames);
export default gameRouter;