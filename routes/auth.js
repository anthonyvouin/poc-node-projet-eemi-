// src/routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Route d'inscription
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hachage du mot de passe avec un sel aléatoire
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route de connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    // Vérification du mot de passe haché
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    // Vous pouvez ajouter ici la logique pour générer et envoyer le token JWT
    res.status(200).json({ message: "Connexion réussie" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
