import Joi from "joi";
import { RequestValidationSchemas } from "../middleware/validateRequest";

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: aB3dEfGhIjKlMnOpQrSt
 *         name:
 *           type: string
 *           example: Spring Tech Meetup
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2026-04-15T18:00:00.000Z
 *         capacity:
 *           type: integer
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           example: 0
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: active
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           example: meetup
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateEventRequest:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           example: Spring Tech Meetup
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2026-04-15T18:00:00.000Z
 *         capacity:
 *           type: integer
 *           example: 100
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: active
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           example: meetup
 *
 *     UpdateEventRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Spring Tech Meetup Updated
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2026-04-16T18:00:00.000Z
 *         capacity:
 *           type: integer
 *           example: 150
 *         registrationCount:
 *           type: integer
 *           example: 10
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: active
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           example: workshop
 *
 *     ValidationErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Validation failed
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "\"name\" is required"
 *             - "\"date\" must be in ISO 8601 date format"
 *
 *     EventListResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Events retrieved successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 *
 *     EventSingleResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Event retrieved successfully
 *         data:
 *           $ref: '#/components/schemas/Event'
 *
 *     EventDeleteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Event deleted successfully
 */

const objectIdSchema = Joi.string()
    .pattern(/^[a-zA-Z0-9]{20}$/)
    .messages({
        "string.empty": "\"id\" is required",
        "string.pattern.base": "\"id\" must be a valid Firestore document ID",
    });

const nameSchema = Joi.string().trim().min(3).max(100).messages({
    "string.empty": "\"name\" is required",
    "string.min": "\"name\" must be at least 3 characters long",
    "string.max": "\"name\" must be at most 100 characters long",
});

const dateSchema = Joi.string().isoDate().messages({
    "string.empty": "\"date\" is required",
    "string.isoDate": "\"date\" must be in ISO 8601 date format",
});

const capacitySchema = Joi.number().integer().min(1).messages({
    "number.base": "\"capacity\" must be a number",
    "number.integer": "\"capacity\" must be an integer",
    "number.min": "\"capacity\" must be at least 1",
});

const statusSchema = Joi.string().valid("active", "cancelled", "completed").messages({
    "any.only": "\"status\" must be one of: active, cancelled, completed",
});

const categorySchema = Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").messages({
    "any.only": "\"category\" must be one of: conference, workshop, meetup, seminar, general",
});

const registrationCountSchema = Joi.number().integer().min(0).messages({
    "number.base": "\"registrationCount\" must be a number",
    "number.integer": "\"registrationCount\" must be an integer",
    "number.min": "\"registrationCount\" must be at least 0",
});

export const createEventValidation: RequestValidationSchemas = {
    body: Joi.object({
        name: nameSchema.required(),
        date: dateSchema.required(),
        capacity: capacitySchema.required(),
        status: statusSchema.optional(),
        category: categorySchema.optional(),
    }),
};

export const updateEventValidation: RequestValidationSchemas = {
    params: Joi.object({
        id: objectIdSchema.required(),
    }),
    body: Joi.object({
        name: nameSchema.optional(),
        date: dateSchema.optional(),
        capacity: capacitySchema.optional(),
        registrationCount: registrationCountSchema.optional(),
        status: statusSchema.optional(),
        category: categorySchema.optional(),
    })
        .min(1)
        .messages({
            "object.min": "At least one field must be provided for update",
        }),
};

export const getEventByIdValidation: RequestValidationSchemas = {
    params: Joi.object({
        id: objectIdSchema.required(),
    }),
};

export const deleteEventValidation: RequestValidationSchemas = {
    params: Joi.object({
        id: objectIdSchema.required(),
    }),
};