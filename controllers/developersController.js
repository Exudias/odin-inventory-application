const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.developersGet = asyncHandler(async (req, res) => {
    const allDevelopers = await db.getAllDevelopers();

    res.render("developers", { title: "Developers", developers: allDevelopers });
});

exports.developerAndGamesGet = asyncHandler(async (req, res) => {
    const devId = req.params.id;
    const devAndGames = await db.getDevAndGames(devId);

    const devName = devAndGames[0].name;
    const games = devAndGames.map((row) => {return {title: row.title, release_date: row.release_date, id: row.id}});

    res.render("devGames", { title: `${devName}'s Games` , devName, games });
});