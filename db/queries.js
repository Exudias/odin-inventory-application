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

async function getGamesByDevId(devId) {
    const query = `
    SELECT DISTINCT title, release_date, g.id
    FROM games AS g
    JOIN games_developers ON g.id = developer_id
    WHERE developer_id = $1;
    `;

    const { rows } = await pool.query(query, [devId]);
    return rows;
}

async function getGamesByGenreId(genreId) {
    const query = `
    SELECT DISTINCT title, release_date, g.id
    FROM games AS g
    JOIN games_genres ON g.id = game_id
    WHERE genre_id = $1;
    `;

    const { rows } = await pool.query(query, [genreId]);
    return rows;
}

async function getGameById(gameId) {
    const query = `
    SELECT *
    FROM games
    WHERE id = $1;
    `;

    const {rows} = await pool.query(query, [gameId]);
    return rows[0];
}

async function getDevById(devId)
{
    const query = `
    SELECT *
    FROM developers
    WHERE id = $1;
    `;

    const {rows} = await pool.query(query, [devId]);
    return rows[0];
}

async function getGenreById(genreId)
{
    const query = `
    SELECT *
    FROM genres
    WHERE id = $1;
    `;

    const {rows} = await pool.query(query, [genreId]);
    return rows[0];
}

async function getGenresByGameId(gameId) {
    const query = `
    SELECT DISTINCT g.name AS genre_name,
    g.id AS genre_id
    FROM genres AS g
    JOIN games_genres AS gg ON g.id = gg.genre_id
    WHERE gg.game_id = $1;
    `;

    const {rows} = await pool.query(query, [gameId]);
    return rows;
}

async function getDevelopersByGameId(gameId) {
    const query = `
    SELECT DISTINCT d.name AS dev_name,
    d.id AS dev_id
    FROM developers AS d
    JOIN games_developers AS gd ON d.id = gd.developer_id
    WHERE gd.game_id = $1;
    `;

    const {rows} = await pool.query(query, [gameId]);
    return rows;
}

async function getGenreAndGames(genreId) {
    const query = `
    SELECT ge.name, ga.title, ga.release_date, ga.id
    FROM genres AS ge
    LEFT JOIN games_genres
    ON ge.id = genre_id
    LEFT JOIN games AS ga
    ON ga.id = game_id
    WHERE ge.id = ($1)
    `;

    const { rows } = await pool.query(query, [genreId]);
    return rows;
}

async function addDeveloper(name) {
    const query = `
        INSERT INTO developers (name)
        VALUES ($1);
    `;

    await pool.query(query, [name]);
}

async function addGame(title, releaseDate) {
    const query = `
    INSERT INTO games (title, release_date)
    VALUES ($1, $2);
    `;

    await pool.query(query, [title, releaseDate]);
}

async function addGenre(name) {
    const query = `
    INSERT INTO genres (name)
    VALUES ($1);
    `;

    await pool.query(query, [name]);
}

module.exports = {
    getAllGames,
    getAllDevelopers,
    getAllGenres,
    getGamesByDevId,
    getGamesByGenreId,
    getGameById,
    getDevelopersByGameId,
    getGenresByGameId,
    getGenreAndGames,
    addDeveloper,
    getDevById,
    getGenreById,
    addGame,
    addGenre,
}