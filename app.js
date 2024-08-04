const express = require("express");
const app = express();

const indexRouter = require("./routes/indexRouter");
const developersRouter = require("./routes/developersRouter");
const gamesRouter = require("./routes/gamesRouter");
const genresRouter = require("./routes/genresRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/genres", genresRouter);
app.use("/games", gamesRouter);
app.use("/developers", developersRouter);
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Express app listening on ${PORT}!`)});