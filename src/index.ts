import app from "./app.js";
import { connectDB } from "./infra/database/connection.js";
import logger from "./config/logger.js";
import { PORT } from "./config/env.js";
import { initScheduler } from "./infra/cron/index.js";
import "./infra/queue/worker.js";

const startServer = async() => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            logger.info(`[SERVER] Running on PORT ${PORT}`);
        });

        initScheduler();

        process.on("SIGINT", () => {
            logger.info("[SERVER] Shutting down...");
            server.close(() => {
                process.exit(0);
            });
        });
    } catch(error) {
        logger.error(`[SERVER] Connection failed to start ${error}`);
        process.exit(1);
    }
};

startServer();