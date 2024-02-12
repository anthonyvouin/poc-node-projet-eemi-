// Import des modules ES6
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const articles = [];

app.get("/api/articles", (req, res) => {
  res.json({ articles });
});

app.post("/api/articles", (req, res) => {
  const { title, content } = req.body;
  const newArticle = { title, content };
  articles.push(newArticle);
  res.json({ message: "Article créé avec succès", article: newArticle });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
