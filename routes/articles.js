import express from "express";

const router = express.Router();

const articles = [];

router.get("/", (req, res) => {
  res.json({ articles });
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  const newArticle = { title, content };
  articles.push(newArticle);
  res.json({ message: "Article créé avec succès", article: newArticle });
});

export default router;
