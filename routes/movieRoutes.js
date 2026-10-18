const express = require("express");
const {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.patch("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
