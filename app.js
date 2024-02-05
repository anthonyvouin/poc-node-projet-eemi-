// Import des modules ES6
import express from "express";

const app = express();
const port = 3000;

// Middleware pour gérer le corps des requêtes (body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route d'exemple
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
