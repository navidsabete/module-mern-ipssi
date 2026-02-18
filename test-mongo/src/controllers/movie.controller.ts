import express from 'express';
import { Request, Response } from 'express';
import movieModel, {IMovie} from '../models/movie.model';

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    try{
        console.log("POST createMovie");
        const movieData = req.body;
        const newMovie = new movieModel(movieData);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
        console.log("Film crée");
        
    }
    catch(error){
        console.error("Erreur lors de la création du film :", error);
        res.status(500).json({message: "Erreur serveur lors de la création du film"});
    }
}


export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try{
        console.log("GET getAllMovies");
        const movies = await movieModel.find();
        res.status(200).json(movies);
        console.log("Film(s) récupéré(s)");
        
    }
    catch(error){
        console.error("Erreur lors de la récupération des films :", error);
        res.status(500).json({message: "Erreur serveur lors de la récupération des films"});
    }
}


export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    try{
        console.log("GET getMovieById");
        const { id } = req.params;
        const movie = await movieModel.findById(id);
        if (!movie) {
            res.status(404).json({ message: "Film non trouvé" });
            return; 
        }
        res.status(200).json(movie);
        console.log("Film trouvé");
        
    }
    catch(error){
        console.error("Erreur lors de la récupération des films :", error);
        res.status(500).json({message: "Erreur serveur lors de la récupération du film"});
    }
}
