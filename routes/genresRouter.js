const { Router } = require("express");
const genresController = require("../controllers/genresController");

const genresRouter = Router();
  
genresRouter.get("/", genresController.genresGet);
genresRouter.get("/new", genresController.genreNewGet);
genresRouter.post("/new", genresController.genreNewPost);
genresRouter.get("/:id", genresController.genreAndGamesGet);

module.exports = genresRouter;