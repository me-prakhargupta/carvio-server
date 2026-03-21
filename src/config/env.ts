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

export const PORT: number = portNumber;

export const MONGO_URI: string = requireEnv("MONGO_URI");

export const SYSTEM_EMAIL: string = 
    requireEnv("SYSTEM_EMAIL");
export const SYSTEM_EMAIL_PASS: string = 
    requireEnv("SYSTEM_EMAIL_PASS");

export const ACCESS_TOKEN_SECRET = 
    requireEnv("ACCESS_TOKEN_SECRET");
export const ACCESS_TOKEN_EXPIRY =
  requireEnv("ACCESS_TOKEN_EXPIRY") as `${number}${"s" | "m" | "h" | "d"}`;

export const REFRESH_TOKEN_SECRET = 
    requireEnv("REFRESH_TOKEN_SECRET");
export const REFRESH_TOKEN_EXPIRY =
  requireEnv("REFRESH_TOKEN_EXPIRY") as `${number}${"s" | "m" | "h" | "d"}`;

export const NODE_ENV: string = requireEnv("NODE_ENV");

export const CLIENT_URI: string = requireEnv("CLIENT_URI");