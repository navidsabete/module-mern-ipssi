import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface IMovie extends Document {
    title: string;
    director : string;
    year : number;
    genre : string;
    duration : number;
    poster?: string; // URL de l'image
    description?: string;
}

const MovieSchema = new Schema({
    title: {type: String, required: true},
    director: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    duration: {type: Number, required: true},
    poster: { type: String, required: false },
    description: { type: String, required: false }
},
    {timestamps: true} 
);

export default mongoose.model<IMovie>('Movie', MovieSchema);

