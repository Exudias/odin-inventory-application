const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const {body, validationResult} = require("express-validator");

const lengthErr = "must be between 1 and 255 characters";
const formatErr = "must have a proper format";

const validateGame = [
    body("title").trim()
    .isLength({min: 1, max: 255}).withMessage(`Game title ${lengthErr}`),
    body("release_date").trim()
    .isDate().withMessage(`Release date ${formatErr}`),
];

const validateNewGame = [
    body("new_title").trim()
    .isLength({min: 1, max: 255}).withMessage(`Game title ${lengthErr}`),
    body("new_release_date").trim()
    .isDate().withMessage(`Release date ${formatErr}`),
]

exports.gamesGet = asyncHandler(async (req, res) => {
    const allGames = await db.getAllGames();

    res.render("games", { title: "Games", games: allGames });
});

exports.gameInfoGet = asyncHandler(async (req, res) => {
    const gameId = req.params.id;

    const rowsDevs = await db.getDevelopersByGameId(gameId);
    const rowsGenres = await db.getGenresByGameId(gameId);
    const gameInfo = await db.getGameById(gameId);

    const allNonGameDevs = await db.getDevsNotWithGameId(gameId);
    const allNonGameGenres = await db.getGenresNotWithGameId(gameId);

    res.render("gameInfo", { title: gameInfo.title, rowsDevs, rowsGenres, gameInfo, nonDevs: allNonGameDevs, nonGenres: allNonGameGenres });
});

exports.gameNewGet = asyncHandler(async (req, res) => {
    res.render("gameNew", { title: "Create a game" });
});

exports.gameNewPost = [
    validateGame,
    asyncHandler(async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("gameNew", {
                title: "Create a game",
                errors: errors.array(),
            });
        }

        await db.addGame(req.body.title, req.body.release_date);
    
        res.redirect("/games");
    }),
];

exports.gameLinkDeveloperPost = asyncHandler(async (req,res) => {
    const gameId = req.params.id;
    const devId = req.body.developer_id;

    await db.linkDeveloperToGame(devId, gameId);

    res.redirect("/games/" + gameId);
});

exports.gameLinkGenrePost = asyncHandler(async (req,res) => {
    const gameId = req.params.id;
    const genreId = req.body.genre_id;

    await db.linkGenreToGame(gameId, genreId);

    res.redirect("/games/" + gameId);
});

exports.gameDelete = asyncHandler(async (req,res) => {
    const gameId = req.params.id;

    await db.deleteGame(gameId);

    res.redirect("/games/");
});

exports.gameUnlink = asyncHandler(async (req, res) => {
    const gameId = req.params.id;

    const devId = req.query.dev_id;
    const genreId = req.query.genre_id;

    if (devId >= 0)
    {
        await db.unlinkGameDeveloper(gameId, devId);
    }

    if (genreId >= 0)
    {
        await db.unlinkGameGenre(gameId, genreId);
    }

    const referer = req.get('Referer');
    res.redirect(referer || '/');
});

exports.gameUpdate = [
    validateNewGame,
    asyncHandler(async (req, res) => {
        const gameId = req.params.id;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const game = await db.getGameById(gameId);
            return res.status(400).render("devUpdate", {
                title: "Update a game",
                errors: errors.array(),
                id: game.id,
                game
            });
        }

        const newName = req.body.new_title;
        const newRelease = req.body.new_release_date;
    
        await db.editGame(gameId, newName, newRelease);
    
        res.redirect("/games/");
    })
];

exports.gameUpdateGet = asyncHandler(async (req, res) => {
    const gameId = req.params.id;

    const game = await db.getGameById(gameId);

    game.release_date = formatDateForInput(game.release_date);

    res.render("gameUpdate", { title: "Update a game", id: gameId, game });
});

function formatDateForInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}