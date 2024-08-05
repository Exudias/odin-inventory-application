const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.gamesGet = asyncHandler(async (req, res) => {
    const allGames = await db.getAllGames();

    res.render("games", { title: "Games", games: allGames });
});

exports.gameInfoGet = asyncHandler(async (req, res) => {
    const gameId = req.params.id;

    const rowsDevs = await db.getDevelopersByGameId(gameId);
    const rowsGenres = await db.getGenresByGameId(gameId);
    const gameInfo = await db.getGameById(gameId);

    res.render("gameInfo", { title: gameInfo.title, rowsDevs, rowsGenres, gameInfo });
});

exports.gameNewGet = asyncHandler(async (req, res) => {
    res.render("gameNew", { title: "Create a game" });
});

exports.gameNewPost = asyncHandler(async (req,res) => {
    await db.addGame(req.body.title, req.body.release_date);

    res.redirect("/games");
});