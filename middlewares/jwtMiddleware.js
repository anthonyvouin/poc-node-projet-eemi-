import jwt from "jsonwebtoken";


const jwtSecret = "JWT_SECRET_KEY";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn: "1h",
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  try {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new Error("Format de token invalide");
    }

    const decoded = jwt.verify(tokenParts[1], jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Token invalide" });
    } else {
      return res
        .status(500)
        .json({ message: "Erreur lors de la vérification du token" });
    }
  }
};

export { generateToken, verifyToken };
