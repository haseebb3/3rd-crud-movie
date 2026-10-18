const express = require("express");
const app = express();
const cors = require("cors")
const router = require("./router/moviesRouter");
const { getAllMovies } = require("./controller/moviesController");

app.use(cors());
app.use(express.json());

app.get("", getAllMovies)
app.use("/movies", router);

module.exports = app