#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config();

const CREATE_SQL = `
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (255),
    release_date DATE
);

CREATE TABLE IF NOT EXISTS developers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS games_genres (
    game_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE IF NOT EXISTS games_developers (
    game_id INTEGER,
    developer_id INTEGER,
    PRIMARY KEY (game_id, developer_id),
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (developer_id) REFERENCES developers(id)
);
`;

async function main() {
    const environment = process.env.ENVIRONMENT || 'local';
    const connectionString = environment === 'prod'
        ? process.env.PROD_DATABASE_URL
        : process.env.LOCAL_DATABASE_URL;

    console.log("Seeding database...");
    const client = new Client({ connectionString });

    try {
        await client.connect();

        // Create tables
        await client.query(CREATE_SQL);
        
        // Insert into tables
        const gameResult = await client.query("INSERT INTO games (title, release_date) VALUES ('Epic Quest', '2024-08-01') RETURNING id;");
        const gameId = gameResult.rows[0].id;

        const developerResult = await client.query("INSERT INTO developers (name) VALUES ('Epic Games Studio') RETURNING id;");
        const developerId = developerResult.rows[0].id;

        const genreResult = await client.query("INSERT INTO genres (name) VALUES ('RPG') RETURNING id;");
        const genreId = genreResult.rows[0].id;

        // Insert into junction tables
        await client.query("INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2);", [gameId, genreId]);
        await client.query("INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2);", [gameId, developerId]);

        console.log("Database seeded successfully.");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        await client.end();
        console.log("Connection closed.");
    }
}

main();
