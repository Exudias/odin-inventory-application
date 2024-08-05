const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query("SELECT * FROM games");
    return rows;
}

async function getAllDevelopers() {
    const { rows } = await pool.query("SELECT * FROM developers");
    return rows;
}

async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function getDevAndGames(devId) {
    const query = `
    SELECT d.name, g.title, g.release_date, g.id
    FROM developers AS d
    LEFT JOIN games_developers
    ON d.id = developer_id
    LEFT JOIN games AS g
    ON g.id = game_id
    WHERE d.id = ($1)
    `;

    const { rows } = await pool.query(query, [devId]);
    return rows;
}

async function getGameInfo(gameId) {
    const queryDevs = `
    SELECT DISTINCT d.name AS dev_name,
    d.id AS dev_id
    FROM developers AS d
    JOIN games_developers AS gd ON d.id = gd.developer_id
    WHERE gd.game_id = $1;
    `;

    const queryGenres = `
    SELECT DISTINCT g.name AS genre_name,
    g.id AS genre_id
    FROM genres AS g
    JOIN games_genres AS gg ON g.id = gg.genre_id
    WHERE gg.game_id = $1;
    `;

    const queryGame = `
    SELECT *
    FROM games
    WHERE id = $1;
    `;

    const rowsDevs = (await pool.query(queryDevs, [gameId])).rows;
    const rowsGenres = (await pool.query(queryGenres, [gameId])).rows;
    const gameInfo = (await pool.query(queryGame, [gameId])).rows[0];

    return {rowsDevs, rowsGenres, gameInfo};
}

module.exports = {
    getAllGames,
    getAllDevelopers,
    getAllGenres,
    getDevAndGames,
    getGameInfo,
}