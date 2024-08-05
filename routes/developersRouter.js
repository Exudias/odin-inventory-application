const { Router } = require("express");
const developersController = require("../controllers/developersController");

const developersRouter = Router();
  
developersRouter.get("/", developersController.developersGet);
developersRouter.get("/:id", developersController.developerAndGamesGet);

module.exports = developersRouter;