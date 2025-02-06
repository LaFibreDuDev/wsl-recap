import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("bienvenue sur mon application NodeJS !");
})

app.listen("3000", () => {
    console.log(`🚀Server listening on port 3000`);
})