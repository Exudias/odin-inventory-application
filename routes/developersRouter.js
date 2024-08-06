const { Router } = require("express");
const developersController = require("../controllers/developersController");

const developersRouter = Router();
  
developersRouter.get("/", developersController.developersGet);
developersRouter.get("/new", developersController.developerNewGet);
developersRouter.post("/new", developersController.developerNewPost);
developersRouter.get("/:id", developersController.developerAndGamesGet);
developersRouter.post("/:id/newGame", developersController.developerLinkGamePost);
developersRouter.delete("/:id", developersController.developerDelete);

module.exports = developersRouter;