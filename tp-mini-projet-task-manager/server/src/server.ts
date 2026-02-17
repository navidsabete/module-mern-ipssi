import express from 'express';
import cors from 'cors';

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Autorise les requêtes externes
app.use(express.json()); // Permet de lire le body des requêtes POST/PUT en JSON
app.use((req, res, next) => {
    console.log(`Requête reçue : ${req.method} ${req.url}`);
    next();
});
app.get('/', (req, res) => res.send("Le serveur répond bien !"));
// "Base de données" temporaire en RAM
let tasks = [
    { id: 1, label: "Apprendre Express", isDone: false },
    { id: 2, label: "Réussir le projet", isDone: true }
];

// --- ROUTES ---

// 1. GET /api/tasks : Récupérer tout
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// 2. POST /api/tasks : Créer une tâche
app.post('/api/tasks', (req, res) => {
    const { label } = req.body;
    
    if (!label) {
        return res.status(400).json({ error: "Le label est requis" });
    }

    const newTask = {
        id: Date.now(), // Génération d'ID simple
        label: label,
        isDone: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 3. PUT /api/tasks/:id : Inverser l'état isDone
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: "Tâche non trouvée" });
    }

    // On inverse l'état actuel
    task.isDone = !task.isDone;
    
    res.json(task);
});

// 4. DELETE /api/tasks/:id : Supprimer
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;
    
    // On filtre pour garder tout sauf l'ID concerné
    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length === initialLength) {
        return res.status(404).json({ error: "Tâche non trouvée" });
    }

    res.json({ message: "Tâche supprimée avec succès", id });
});

app.listen(PORT, () => {
    console.log(`Serveur Task Manager démarré sur http://localhost:${PORT}`);
});