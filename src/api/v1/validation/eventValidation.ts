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
 *           example: 67fa0f5c2f7d4f7f8d07c123
 *         title:
 *           type: string
 *           example: Spring Tech Meetup
 *         description:
 *           type: string
 *           example: Community meetup for developers and students
 *         eventDate:
 *           type: string
 *           format: date-time
 *           example: 2026-04-15T18:00:00.000Z
 *         location:
 *           type: string
 *           example: Winnipeg Innovation Centre
 *
 *     CreateEventRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - eventDate
 *         - location
 *       properties:
 *         title:
 *           type: string
 *           example: Spring Tech Meetup
 *         description:
 *           type: string
 *           example: Community meetup for developers and students
 *         eventDate:
 *           type: string
 *           format: date-time
 *           example: 2026-04-15T18:00:00.000Z
 *         location:
 *           type: string
 *           example: Winnipeg Innovation Centre
 *
 *     UpdateEventRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Spring Tech Meetup Updated
 *         description:
 *           type: string
 *           example: Updated meetup details for students and developers
 *         eventDate:
 *           type: string
 *           format: date-time
 *           example: 2026-04-16T18:00:00.000Z
 *         location:
 *           type: string
 *           example: RRC Polytech Exchange District Campus
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
 *             - "\"title\" is required"
 *             - "\"eventDate\" must be in ISO 8601 date format"
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
    .pattern(/^[a-fA-F0-9]{24}$/)
    .messages({
        "string.empty": "\"id\" is required",
        "string.pattern.base": "\"id\" must be a valid 24-character hex string",
    });

const titleSchema = Joi.string().trim().min(3).max(100).messages({
    "string.empty": "\"title\" is required",
    "string.min": "\"title\" must be at least 3 characters long",
    "string.max": "\"title\" must be at most 100 characters long",
});

const descriptionSchema = Joi.string().trim().min(10).max(500).messages({
    "string.empty": "\"description\" is required",
    "string.min": "\"description\" must be at least 10 characters long",
    "string.max": "\"description\" must be at most 500 characters long",
});

const eventDateSchema = Joi.string().isoDate().messages({
    "string.empty": "\"eventDate\" is required",
    "string.isoDate": "\"eventDate\" must be in ISO 8601 date format",
});

const locationSchema = Joi.string().trim().min(2).max(120).messages({
    "string.empty": "\"location\" is required",
    "string.min": "\"location\" must be at least 2 characters long",
    "string.max": "\"location\" must be at most 120 characters long",
});

export const createEventValidation: RequestValidationSchemas = {
    body: Joi.object({
        title: titleSchema.required(),
        description: descriptionSchema.required(),
        eventDate: eventDateSchema.required(),
        location: locationSchema.required(),
    }),
};

export const updateEventValidation: RequestValidationSchemas = {
    params: Joi.object({
        id: objectIdSchema.required(),
    }),
    body: Joi.object({
        title: titleSchema.optional(),
        description: descriptionSchema.optional(),
        eventDate: eventDateSchema.optional(),
        location: locationSchema.optional(),
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