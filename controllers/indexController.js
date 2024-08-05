const asyncHandler = require("express-async-handler");

exports.indexGet = asyncHandler(async (req, res) => {
    res.render("index", { title: "Home", cssFile: "/css/index.css" });
});

exports.aboutGet = asyncHandler(async (req, res) => {
    res.render("about", { title: "About" });
});