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
    SELECT d.name, g.title, g.release_date 
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

module.exports = {
    getAllGames,
    getAllDevelopers,
    getAllGenres,
    getDevAndGames,
}