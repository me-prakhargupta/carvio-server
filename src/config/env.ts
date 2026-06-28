import dotenv from "dotenv";
dotenv.config();

const requireEnv = (key: string): string => {
    const value = process.env[key];

    if(!value) {
        throw new Error(`Missing environment key for ${key}`);
    }

    return value;
};

const rawPort = requireEnv("PORT");
const portNumber = Number(rawPort);
if(Number.isNaN(portNumber)) {
    throw new Error("PORT number must be a valid number");
}

const PORT: number = portNumber;

const MONGO_URI: string = requireEnv("MONGO_URI");

const rawSaltRound = requireEnv("SALT_ROUND");
const saltRound = Number(rawSaltRound);
if(Number.isNaN(saltRound)) {
    throw new Error("SALT ROUND must be a valid number");
}

const SALT_ROUND: number = saltRound;

const REDIS_URI: string = requireEnv("REDIS_URI");

const ACCESS_TOKEN_SECRET = 
    requireEnv("ACCESS_TOKEN_SECRET");
const ACCESS_TOKEN_EXPIRY =
  requireEnv("ACCESS_TOKEN_EXPIRY") as `${number}${"s" | "m" | "h" | "d"}`;

const REFRESH_TOKEN_SECRET = 
    requireEnv("REFRESH_TOKEN_SECRET");
const REFRESH_TOKEN_EXPIRY =
  requireEnv("REFRESH_TOKEN_EXPIRY") as `${number}${"s" | "m" | "h" | "d"}`;

const NODE_ENV: string = requireEnv("NODE_ENV");

const LOG_LEVEL: string = requireEnv("LOG_LEVEL");

const CLIENT_URI: string = requireEnv("CLIENT_URI");

const RESEND_API_KEY: string = requireEnv("RESEND_API_KEY");
const BREVO_API_KEY: string = requireEnv("BREVO_API_KEY");

const SYSTEM_USER_EMAIL: string = requireEnv("SYSTEM_USER_EMAIL");
const SYSTEM_USER_PASS: string = requireEnv("SYSTEM_USER_PASS");


export {
    PORT,
    MONGO_URI,
    SALT_ROUND,
    REDIS_URI,
    ACCESS_TOKEN_SECRET, 
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET, 
    REFRESH_TOKEN_EXPIRY,
    NODE_ENV,
    LOG_LEVEL,
    CLIENT_URI,
    RESEND_API_KEY,
    BREVO_API_KEY,
    SYSTEM_USER_EMAIL, 
    SYSTEM_USER_PASS,
};