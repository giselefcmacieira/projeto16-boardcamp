import { Router } from "express"
import { getGames } from "../controllers/gameControllers.js"

const gameRouter = Router();

gameRouter.get("/games", getGames);

export default gameRouter;