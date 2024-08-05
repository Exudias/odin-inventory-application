const { Router } = require("express");
const gamesController = require("../controllers/gamesController");

const gamesRouter = Router();
  
gamesRouter.get("/", gamesController.gamesGet);
gamesRouter.get("/new", gamesController.gameNewGet);
gamesRouter.post("/new", gamesController.gameNewPost);
gamesRouter.get("/:id", gamesController.gameInfoGet);

module.exports = gamesRouter;