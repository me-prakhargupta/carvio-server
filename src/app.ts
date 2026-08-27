import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors, {CorsOptions} from "cors";
import { CLIENT_URI } from "./config/env.js";
import rateLimit from "express-rate-limit";
import logger from "./config/logger.js";

const app = express();

const corsOptions: CorsOptions = {
    origin: [CLIENT_URI, "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.set("trust proxy", 1);
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.use((req, res, next) => {
    const start = process.hrtime.bigint();

    res.on("finish", () => {
        const end = process.hrtime.bigint();
        const ms = Number(end - start) / 1_000_000;
        logger.info(`${req.method} ${req.originalUrl} - ${ms.toFixed(2)}ms`);
    });

    next();
})

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => res.status(200).json({
    message: "Apologies for the inconvenience. Please return to Carvio and try again."
}));

app.use("/api/v1", routes);

export default app;