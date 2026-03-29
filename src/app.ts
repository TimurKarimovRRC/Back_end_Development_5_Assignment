import express from "express";
import cors from "cors";
import healthRoutes from "./api/v1/routes/healthRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";
import setupSwagger from "./config/swagger";
import { helmetMiddleware } from "./config/helmetOptions";
import { getCorsOptions } from "./config/corsOptions";

const app = express();

app.use(express.json());
app.use(helmetMiddleware);
app.use(cors(getCorsOptions()));

setupSwagger(app);

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/events", eventRoutes);

export default app;