const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const {body, validationResult} = require("express-validator");

const lengthErr = "must be between 1 and 255 characters";

const validateGenre = [
    body("name").trim()
    .isLength({min: 1, max: 255}).withMessage(`Genre name ${lengthErr}`),
];

const validateNewGenre = [
    body("new_name").trim()
    .isLength({min: 1, max: 255}).withMessage(`Genre name ${lengthErr}`),
]

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

exports.genreNewPost = [
    validateGenre,
    asyncHandler(async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("genreNew", {
                title: "Create a genre",
                errors: errors.array(),
            });
        }

        await db.addGenre(req.body.name);
    
        res.redirect("/genres");
    })
];

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

exports.genreUpdate = [
    validateNewGenre,
    asyncHandler(async (req, res) => {
        const genreId = req.params.id;
        const newName = req.body.new_name;
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const genre = await db.getGenreById(genreId);
            return res.status(400).render("genreUpdate", {
                title: "Update a genre",
                errors: errors.array(),
                id: genre.id,
                genre
            });
        }
    
        await db.editGenre(genreId, newName);
    
        res.redirect("/genres/");
    })
];

exports.genreUpdateGet = asyncHandler(async (req, res) => {
    const genreId = req.params.id;

    const genre = await db.getGenreById(genreId);

    res.render("genreUpdate", { title: "Update a genre", id: genreId, genre });
});
