import { Router } from "express";
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from "../controllers/movie.controller";


const movieRouter = Router();

movieRouter.post("/", createMovie);
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;