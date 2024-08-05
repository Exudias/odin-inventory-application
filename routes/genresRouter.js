const { Router } = require("express");
const genresController = require("../controllers/genresController");

const genresRouter = Router();
  
genresRouter.get("/", genresController.genresGet);
genresRouter.get("/:id", genresController.genreAndGamesGet);

module.exports = genresRouter;