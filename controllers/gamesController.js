const asyncHandler = require("express-async-handler");

exports.gamesGet = asyncHandler(async (req, res) => {
    res.render("games", { title: "Games" });
});