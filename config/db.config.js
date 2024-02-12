import mongoose from "mongoose";

//Connexion à la base de données
const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://root:root@dbv1.xuizfov.mongodb.net/?retryWrites=true&w=majority";

    await mongoose.connect(uri);
    console.log("Connexion à la base de données établie");
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error.message);
    process.exit(1);
  }
};

export default connectDB;
