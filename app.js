import express from "express";
import articlesRouter from "./routes/articles.js";
import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = 3000;

// Middleware pour gérer le corps des requêtes (body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données
connectDB();

// Utilisation des routes
app.use("/api/articles", articlesRouter);
app.use("/api/auth",authRouter);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
