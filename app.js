const express = require("express");
const app = express();
const path = require("node:path");
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require("./routes/indexRouter");
const developersRouter = require("./routes/developersRouter");
const gamesRouter = require("./routes/gamesRouter");
const genresRouter = require("./routes/genresRouter");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to set the cssFile variable
app.use((req, res, next) => {
    res.locals.cssFile = null;
    next();
});

app.use("/genres", genresRouter);
app.use("/games", gamesRouter);
app.use("/developers", developersRouter);
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Express app listening on ${PORT}!`)});