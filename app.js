// Import des modules ES6
import express from "express";

const app = express();
const port = 3000;

// Middleware pour gérer le corps des requêtes (body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Liste d'articles (simulée en mémoire)
const articles = [];

// Route pour récupérer la liste des articles
app.get("/api/articles", (req, res) => {
  res.json({ articles });
});

// Route pour créer un nouvel article
app.post("/api/articles", (req, res) => {
  const { title, content } = req.body;
  const newArticle = { title, content };
  articles.push(newArticle);
  res.json({ message: "Article créé avec succès", article: newArticle });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
