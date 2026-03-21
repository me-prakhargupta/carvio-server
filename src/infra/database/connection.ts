import mongoose from "mongoose";
import { dbConfig } from "./config.js";

export const connectDB = async() => {
    try {
        await mongoose.connect(dbConfig.uri);
        console.log("[DB] MongoDB connected");

        mongoose.connection.on("disconnected", () => {
            console.log("[DB] MongoDB disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("[DB] MongoDB reconnected");
        });
    } catch(error) {
        if(error instanceof Error) {
            console.log(`[DB] Connection failed ${error.message}`);
        } else {
            console.log(`[DB] Connection failed ${error}`);
        }

        process.exit(1);
    }
}; 