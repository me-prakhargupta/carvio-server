import mongoose from "mongoose";
import { dbConfig } from "./config.js";
import logger from "../../config/logger.js";

export const connectDB = async() => {
    try {
        await mongoose.connect(dbConfig.uri);
        logger.info("[DB] MongoDB connected");

        mongoose.connection.on("disconnected", () => {
            logger.info("[DB] MongoDB disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            logger.info("[DB] MongoDB reconnected");
        });
    } catch(error) {
        if(error instanceof Error) {
            logger.error(`[DB] Connection failed ${error.message}`);
        } else {
            logger.error(`[DB] Connection failed ${error}`);
        }

        process.exit(1);
    }
};