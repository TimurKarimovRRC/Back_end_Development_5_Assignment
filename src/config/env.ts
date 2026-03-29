import dotenv from "dotenv";

dotenv.config();

const requiredEnvironmentVariables = [
    "PORT",
    "NODE_ENV",
    "FIREBASE_PROJECT_ID",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PRIVATE_KEY",
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

    firebaseProjectId: process.env.FIREBASE_PROJECT_ID as string,
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    firebasePrivateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
        /\\n/g,
        "\n"
    ),
};