import mongoose from "mongoose";

// Function to log MongoDB performance stats
const logMongoDBPerformance = async () => {
  const admin = mongoose.connection.db.admin();
  const serverStatus = await admin.serverStatus();
  console.log("MongoDB Server Status:", serverStatus);
};

// Connexion à la base de données
const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://root:root@dbv1.xuizfov.mongodb.net/?retryWrites=true&w=majority";

    await mongoose.connect(uri);
    console.log("Connexion à la base de données établie");

    // Log MongoDB performance stats after connection
    await logMongoDBPerformance();
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error.message);
    process.exit(1);
  }
};

// Middleware to log MongoDB performance stats before each request
const logMongoDBPerformanceBeforeRequest = async (req, res, next) => {
  await logMongoDBPerformance();
  next();
};

export { connectDB, logMongoDBPerformanceBeforeRequest };
