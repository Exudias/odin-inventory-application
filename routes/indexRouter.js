const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();
  
indexRouter.get("/", indexController.indexGet);
indexRouter.get("/about", indexController.aboutGet);

module.exports = indexRouter;