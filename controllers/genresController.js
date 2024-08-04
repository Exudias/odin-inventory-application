const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.genresGet = asyncHandler(async (req, res) => {
    const allGenres = await db.getAllGenres();

    res.render("genres", { title: "Genres", genres: allGenres });
});