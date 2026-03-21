import app from "./app.js";
import { connectDB } from "./infra/database/connection.js";
import { PORT } from "./config/env.js";
import { initScheduler } from "./infra/cron/index.js";

const startServer = async() => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`[SERVER] Running on PORT ${PORT}`);
        });

        initScheduler();

        process.on("SIGINT", () => {
            console.log("[SERVER] Shutting down...");
            server.close(() => {
                process.exit(0);
            });
        });
    } catch(error) {
        console.log(`[SERVER] Connection failed to start ${error}`);
        process.exit(1);
    }
};

startServer();