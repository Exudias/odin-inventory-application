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

    const genreName = genre.name;

    res.render("genreGames", { title: `${genreName} Games` , genreName, games });
});

exports.genreNewGet = asyncHandler(async (req, res) => {
    res.render("genreNew", { title: "Create a genre" });
});

exports.genreNewPost = asyncHandler(async (req,res) => {
    await db.addGenre(req.body.name);

    res.redirect("/genres");
});