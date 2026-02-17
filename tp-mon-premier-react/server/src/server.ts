import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';

const app = express();
const PORT = 3001; // Port 3001 pour ne pas gêner React (5173)

// --- MIDDLEWARES --- 
// 1. Celui pour autoriser les requêtes externes (CORS) 
app.use(cors());

// 2. Celui pour lire le JSON dans le body des requêtes
app.use(express.json());

// --- DONNÉES --- 
// Simulation de base de données en mémoire

interface Book {
  id: number;
  title: string;
  author: string;
}

let books: Book[] = [ 
  { id: 1, title: "Mon Livre 1", author: "Mon Auteur 1" },
  { id: 2, title: "Mon Livre 2", author: "Mon Auteur 2" }, 
  { id: 3, title: "Mon Livre 3", author: "Mon Auteur 3" } ];

// --- ROUTES --- 
// Route de test 
app.get('/', (req, res) => { 
    console.log("GET /");
    res.send('API Library v1.0 is running...'); 
});

app.get('/api/books', (req: Request, res: Response) => { 
    console.log("GET /api/books");
    res.json(books); 
});


app.post('/api/books', (req: Request, res: Response) => { 
    console.log("POST /api/books");
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author doivent être récupérés !' });
    }

    const newBook: Book = {
        id: Date.now(), // ID unique basé sur la date/heure actuelle
        title,
        author,
    };

    books.push(newBook);

    res.status(201).json(newBook);

});


app.delete('/api/books/:id', (req: Request, res: Response) => {
    const bookID = Number(req.params.id);
    console.log(`DELETE /api/books/${bookID}`);

    if (isNaN(bookID)) {
        return res.status(400).json({ message: 'BookID invalide' });
    }

    const bookExists = books.some(book => book.id === bookID);

    if (!bookExists) {
        return res.status(404).json({ message: 'Book non trouvé' });
    }

    books = books.filter(book => book.id !== bookID);

    res.status(200).json({ message: 'Book supprimé avec succès' });

}
);



// --- DÉMARRAGE ---

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});