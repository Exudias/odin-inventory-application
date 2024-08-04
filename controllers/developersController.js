const asyncHandler = require("express-async-handler");

exports.developersGet = asyncHandler(async (req, res) => {
    res.render("developers", { title: "Developers" });
});