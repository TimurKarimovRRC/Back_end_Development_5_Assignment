import { Router, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

const healthRoutes: Router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Check API health status
 *     description: Returns the current health status of the API.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 uptime:
 *                   type: number
 *                   example: 123.456
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-03-28T18:30:00.000Z
 *                 version:
 *                   type: string
 *                   example: v1
 */
healthRoutes.get("/", (_request: Request, response: Response): void => {
    response.status(HTTP_STATUS.OK).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "v1",
    });
});

export default healthRoutes;