const movies = [
    {
        "id": "m1",
        "title": "Inception",
        "imageUrl": "https://example.com",
        "rating": "8.8",
        "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        "createdAt": "2026-10-15T12:00:00Z",
        "updatedAt": null
    },
    {
        "id": "m2",
        "title": "The Dark Knight",
        "imageUrl": "https://example.com",
        "rating": "9.0",
        "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        "createdAt": "2026-10-15T12:05:00Z",
        "updatedAt": null
    },
    {
        "id": "m3",
        "title": "Interstellar",
        "imageUrl": "https://example.com",
        "rating": "8.7",
        "description": "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
        "createdAt": "2026-10-15T12:10:00Z",
        "updatedAt": null
    },
    {
        "id": "m4",
        "title": "Spirited Away",
        "imageUrl": "https://example.com",
        "rating": "8.6",
        "description": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
        "createdAt": "2026-10-15T12:15:00Z",
        "updatedAt": null
    },
    {
        "id": "m5",
        "title": "Parasite",
        "imageUrl": "https://example.com",
        "rating": "8.5",
        "description": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        "createdAt": "2026-10-15T12:20:00Z",
        "updatedAt": null
    }
]



//imprts
const express = require("express");
const app = express();


//middlewares
app.use(express.json());

//routes
//getAll
app.get("/movies", (req, res) => {
    try {
        res.status(200).json({
            ok: true,
            message: `Movies data fetched successfully...`,
            data: movies
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error while fetching movies data",
            error: err.message
        })
    }
})


//get single
app.get("/movies/:id", (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = movies.find(m => m.id === movieId)
        if (!movie) {
            res.status(404).json({
                ok: false,
                message: `Movie with id ${movieId} doesn't exist...`
            })
        }

        res.status(200).json({
            ok: true,
            message: `Suucessfully fetched movie with id ${movieId}`,
            data: movie
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while fetching movie data`,
            error: err.message
        })
    }

})

//create
app.post("/movies", (req, res) => {
    try {
        const { title, imageUrl, rating = 2, description = "unknown" } = req.body;
        if (!title || !imageUrl) {
            return res.status(400).json({
                ok: false,
                message: `Title and image fields are required...`
            })
        }

        const newMovie = {
            title: title,
            imageUrl: imageUrl,
            rating: rating,
            description: description,
            id: Date.now().toString(),
            createdAt: Date.now(),
            updatedAt: null
        }

        movies.unshift(newMovie);
        res.status(201).json({
            ok: true,
            message: `New Movie with id ${newMovie.id} is created successfully...`,
            data: newMovie
        })


    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while creating movie..`,
            error: err.message
        })
    }
})


//update
app.patch("/movies/:id", (req, res) => {
    const movieId = req.params.id;
    try {
        // const existingObject = movies.find(m => m.id === movieId);
        const updateIndex = movies.findIndex(m => m.id === movieId);
        if(updateIndex === -1){
            return res.status(404).json({
                ok : false,
                message : `MOive with id ${movieId} doesn't exist...`
            })
        }
        const { title, imageUrl, rating = 2, description = "unknown" } = req.body;
        if (!title || !imageUrl) {
            return res.status(400).json({ 
                ok: false,
                message: `title and image url are requires fields`
            })
        }

        const updatedMovie = {
            ...movies[updateIndex],
            title: title,
            imageUrl: imageUrl,
            rating: rating,
            description: description,
            updatedAt: Date.now()
        }

        movies[updateIndex] = updatedMovie;
        res.status(200).json({
            ok: true,
            message: `MOvie with id : ${movieId} is updated successfully...`,
            data: updatedMovie
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: `Error while updating movie with id : ${movieId}`,
            error: err.message
        })
    }
})


//delete
app.delete("/movies/:id", (req, res) => {
    const deleteId = req.params.id;
    try{
        const deleteIndex = movies.findIndex(m => m.id === deleteId);
        if(deleteIndex === -1){
            return res.status(404).json({
                ok : false,
                message : `Movie wiht id : ${deleteId} doesn't exist...`
            })
        }

        movies.splice(deleteIndex,1);
        res.status(200).json({ 
            ok : true,
            message : `Movie with id : ${deleteId} is deleted successfully...`,
            data : movies[deleteIndex]
        })

    } catch(err){
        res.status(500).json({
            ok: false,
            message: `Error while deleting movie with id : ${deleteId}`,
            error: err.message
        })
    }
})
app.listen(3000, () => {
    console.log("app is listening on port 3000");
})