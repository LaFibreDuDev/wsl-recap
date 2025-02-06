import express from "express";
import queryDatabase from "./database.mjs";

const app = express();

app.get('/', (req, res) => {
    res.send("bienvenue sur mon application NodeJS !");
})

// Route pour récupérer les utilisateurs
app.get('/users', async (req, res) => {
    const users = await queryDatabase();
    res.json(users); 
});

app.listen("3000", () => {
    console.log(`🚀Server listening on port 3000`);
})