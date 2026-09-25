import mongoose from "mongoose";

export const ConfigureDB = async () => {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
        console.error("DB_URL is not defined in the .env file.");
        return;
    }
    try {
        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Mongoose Connected");
    } catch (err) {
        console.error("Database connection error:", err.message);
        return err.message;
    }
};
