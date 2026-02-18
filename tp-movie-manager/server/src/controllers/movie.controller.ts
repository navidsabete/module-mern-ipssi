import express from 'express';
import { Request, Response } from 'express';
import movieModel, {IMovie} from '../models/movie.model';

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    try{
        console.log("POST /");
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
        console.log("GET /");
        const { title, genre, sort } = req.query;

        const filter: Record<string, any> = {};
        if (title) filter.title = { $regex: title as string, $options: "i" };
        if (genre) filter.genre = genre as string;

        const query = movieModel.find(filter);
        if (sort === "year" || sort === "newest") query.sort({ year: -1 });
        else if (sort === "oldest") query.sort({ year: 1 });

        const movies = await query;
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
        const { id } = req.params;
        console.log(`GET /${id}`);
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


export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        console.log(`PUT /${id}`);
        const updateData = req.body;

        const updatedMovie = await movieModel.findByIdAndUpdate(
              id,
              updateData,
              { new: true } // retourne le document mis à jour
            );
        if (!updatedMovie) {
            res.status(404).json({ message: "Film non trouvé" });
            return; 
        }
        res.status(200).json(updatedMovie);
        console.log("Film mis à jour");
        
    }
    catch(error){
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).json({message: "Erreur serveur lors de la mise à jour du film"});
    }
}

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        console.log(`DELETE /${id}`);
        

        const deletedMovie = await movieModel.findByIdAndDelete(id);

        if (!deletedMovie) {
            res.status(404).json({ message: "Film non trouvé" });
            return; 
        }
        res.status(200).json(deletedMovie);
        console.log("Film supprimé");
        
    }
    catch(error){
        console.error("Erreur lors de la suppression :", error);
        res.status(500).json({message: "Erreur serveur lors de la suppression du film"});
    }
}

