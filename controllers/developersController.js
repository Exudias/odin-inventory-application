const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.developersGet = asyncHandler(async (req, res) => {
    const allDevelopers = await db.getAllDevelopers();

    res.render("developers", { title: "Developers", developers: allDevelopers });
});