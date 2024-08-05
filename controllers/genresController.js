const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.genresGet = asyncHandler(async (req, res) => {
    const allGenres = await db.getAllGenres();

    res.render("genres", { title: "Genres", genres: allGenres });
});

exports.genreAndGamesGet = asyncHandler(async (req, res) => {
    const genreId = req.params.id;
    const genreAndGames = await db.getGenreAndGames(genreId);

    const genreName = genreAndGames[0].name;
    const games = genreAndGames.map((row) => {return {title: row.title, release_date: row.release_date, id: row.id}});

    res.render("genreGames", { title: `${genreName} Games` , genreName, games });
});