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
    const allNonDevGames = await db.getGamesNotByDevId(devId);

    const devName = dev.name;

    res.render("devGames", { title: `${devName}'s Games` , devName, games, id: devId, nonGames: allNonDevGames });
});

exports.developerNewGet = asyncHandler(async (req, res) => {
    res.render("devNew", { title: "Create a developer" });
});

exports.developerNewPost = asyncHandler(async (req,res) => {
    await db.addDeveloper(req.body.name);

    res.redirect("/developers");
});

exports.developerLinkGamePost = asyncHandler(async (req,res) => {
    const devId = req.params.id;
    const gameId = req.body.game_id;

    await db.linkDeveloperToGame(devId, gameId);

    res.redirect("/developers/" + devId);
});

exports.developerDelete = asyncHandler(async (req,res) => {
    const devId = req.params.id;

    await db.deleteDeveloper(devId);

    res.redirect("/developers/");
});

exports.developerUpdate = asyncHandler(async (req, res) => {
    const devId = req.params.id;
    const newName = req.body.new_name;

    await db.editDev(devId, newName);

    res.redirect("/developers/");
});

exports.developerUpdateGet = asyncHandler(async (req, res) => {
    const devId = req.params.id;

    const dev = await db.getDevById(devId);

    res.render("devUpdate", { title: "Update a developer", id: devId, dev });
});
