const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.genresGet = asyncHandler(async (req, res) => {
    const allGenres = await db.getAllGenres();

    res.render("genres", { title: "Genres", genres: allGenres });
});

exports.genreAndGamesGet = asyncHandler(async (req, res) => {
    const genreId = req.params.id;

    const genre = await db.getGenreById(genreId);
    const games = await db.getGamesByGenreId(genreId);
    const allNonGenreGames = await db.getGamesNotByGenreId(genreId);

    const genreName = genre.name;

    res.render("genreGames", { title: `${genreName} Games` , genreName, games, id: genreId, nonGames: allNonGenreGames });
});

exports.genreNewGet = asyncHandler(async (req, res) => {
    res.render("genreNew", { title: "Create a genre" });
});

exports.genreNewPost = asyncHandler(async (req,res) => {
    await db.addGenre(req.body.name);

    res.redirect("/genres");
});

exports.genreLinkGamePost = asyncHandler(async (req,res) => {
    const genreId = req.params.id;
    const gameId = req.body.game_id;

    await db.linkGenreToGame(gameId, genreId);

    res.redirect("/genres/" + genreId);
});

exports.genreDelete = asyncHandler(async (req,res) => {
    const genreId = req.params.id;

    await db.deleteGenre(genreId);

    res.redirect("/genres/");
});

exports.genreUpdate = asyncHandler(async (req, res) => {
    const genreId = req.params.id;
    const newName = req.body.new_name;

    await db.editGenre(genreId, newName);

    res.redirect("/genres/");
});

exports.genreUpdateGet = asyncHandler(async (req, res) => {
    const genreId = req.params.id;

    const genre = await db.getGenreById(genreId);

    res.render("genreUpdate", { title: "Update a genre", id: genreId, genre });
});
