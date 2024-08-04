const asyncHandler = require("express-async-handler");

exports.genresGet = asyncHandler(async (req, res) => {
    res.render("genres", { title: "Genres" });
});