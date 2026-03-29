import dotenv from "dotenv";

dotenv.config();

const requiredEnvironmentVariables = [
    "PORT",
    "NODE_ENV",
] as const;

for (const environmentVariableName of requiredEnvironmentVariables) {
    if (!process.env[environmentVariableName]) {
        throw new Error(
            `Missing required environment variable: ${environmentVariableName}`
        );
    }
}

export const env = {
    port: Number(process.env.PORT),
    nodeEnvironment: process.env.NODE_ENV ?? "development",
    corsAllowedOrigins: (process.env.CORS_ALLOWED_ORIGINS ?? "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
};