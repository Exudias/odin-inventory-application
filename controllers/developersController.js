const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.developersGet = asyncHandler(async (req, res) => {
    const allDevelopers = await db.getAllDevelopers();

    res.render("developers", { title: "Developers", developers: allDevelopers });
});

exports.developerAndGamesGet = asyncHandler(async (req, res) => {
    const devId = req.params.id;

    const dev = await db.getDevById(devId);
    const games = await db.getGamesByDevId(devId);

    const devName = dev.name;

    res.render("devGames", { title: `${devName}'s Games` , devName, games });
});

exports.developerNewGet = asyncHandler(async (req, res) => {
    res.render("devNew", { title: "Create a developer" });
});

exports.developerNewPost = asyncHandler(async (req,res) => {
    await db.addDeveloper(req.body.name);

    res.redirect("/developers");
});