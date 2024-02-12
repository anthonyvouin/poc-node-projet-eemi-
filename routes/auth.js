import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken, verifyToken } from "../middlewares/jwtMiddleware.js";

const router = express.Router();

// Route d'inscription
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
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

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = generateToken(user);
    console.log("JWT Token:", token); // Log du JWT généré
    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exemple de route sécurisée utilisant le middleware JWT
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ message: "Profil de l'utilisateur", user: req.user });
});

export default router;
