import { Options } from "swagger-jsdoc";
import { env } from "./env";

export const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Timur Karimov Resource Library API",
            version: "1.0.0",
            description: "API documentation created by Timur Karimov",
        },
        servers: [
            {
                url: `http://localhost:${env.port}`,
                description: "Local server",
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"],
};