import mongoose from "mongoose";

// MongoDB connect.
export const connectDb = (MONGO_URL: string) => {
try {
     mongoose.connect(MONGO_URL)
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to DB"));
} catch (error) {
    console.log("DB error: ", error)
}
};
