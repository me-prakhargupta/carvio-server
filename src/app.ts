import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors, {CorsOptions} from "cors";
import { CLIENT_URI } from "./config/env.js";
import rateLimit from "express-rate-limit";

const app = express();

const corsOptions: CorsOptions = {
    origin: [CLIENT_URI, "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.set("trust proxy", 1);
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => res.send("Server is healthy"));

app.use("/api/v1", routes);

export default app;