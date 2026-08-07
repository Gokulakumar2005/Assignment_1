import mongoose from "mongoose";

export const ConfigureDB= async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Mongoose Connected");
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}
