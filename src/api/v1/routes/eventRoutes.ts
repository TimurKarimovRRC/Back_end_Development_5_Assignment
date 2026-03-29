import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import {
    createEventValidation,
    updateEventValidation,
    getEventByIdValidation,
    deleteEventValidation,
} from "../validation/eventValidation";
import {
    createEventController,
    getAllEventsController,
    getEventByIdController,
    updateEventController,
    deleteEventController,
} from "../controllers/eventController";

const eventRoutes = Router();

/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     summary: Get all events
 *     description: Returns a list of all events in the system.
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventListResponse'
 *       500:
 *         description: Internal server error
 */
eventRoutes.get("/", getAllEventsController);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     description: Returns one event that matches the provided ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the event
 *         schema:
 *           type: string
 *           example: 67fa0f5c2f7d4f7f8d07c123
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventSingleResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
eventRoutes.get(
    "/:id",
    validateRequest(getEventByIdValidation),
    getEventByIdController
);

/**
 * @openapi
 * /api/v1/events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event using the provided request body.
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventSingleResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       500:
 *         description: Internal server error
 */
eventRoutes.post(
    "/",
    validateRequest(createEventValidation),
    createEventController
);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   put:
 *     summary: Update an event
 *     description: Updates an existing event that matches the provided ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the event
 *         schema:
 *           type: string
 *           example: 67fa0f5c2f7d4f7f8d07c123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventRequest'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventSingleResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
eventRoutes.put(
    "/:id",
    validateRequest(updateEventValidation),
    updateEventController
);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Deletes an existing event that matches the provided ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the event
 *         schema:
 *           type: string
 *           example: 67fa0f5c2f7d4f7f8d07c123
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventDeleteResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
eventRoutes.delete(
    "/:id",
    validateRequest(deleteEventValidation),
    deleteEventController
);

export default eventRoutes;