import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
    CreateEventInput,
    Event,
    UpdateEventInput,
} from "../models/eventModel";
import {
    createEvent,
    deleteEventById,
    getAllEvents,
    getEventById,
    updateEventById,
} from "../services/eventService";

function getSingleParam(value: unknown): string | undefined {
    if (typeof value === "string") {
        return value;
    }

    if (Array.isArray(value) && typeof value[0] === "string") {
        return value[0];
    }

    return undefined;
}

export async function createEventController(
    request: Request,
    response: Response
): Promise<void> {
    try {
        const createEventInput: CreateEventInput =
            request.body as CreateEventInput;

        const createdEvent: Event = await createEvent(createEventInput);

        response.status(HTTP_STATUS.CREATED).json({
            message: "Event created successfully",
            data: createdEvent,
        });
    } catch (error: unknown) {
        console.error("createEventController error:", error);

        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to create event",
        });
    }
}

export async function getAllEventsController(
    _request: Request,
    response: Response
): Promise<void> {
    try {
        const eventList: Event[] = await getAllEvents();

        response.status(HTTP_STATUS.OK).json({
            message: "Events retrieved successfully",
            data: eventList,
        });
    } catch (error: unknown) {
        console.error("getAllEventsController error:", error);

        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to fetch events",
        });
    }
}

export async function getEventByIdController(
    request: Request,
    response: Response
): Promise<void> {
    try {
        const eventId: string | undefined = getSingleParam(request.params.id);

        if (!eventId) {
            response.status(HTTP_STATUS.BAD_REQUEST).json({
                error: "Event id is required",
            });
            return;
        }

        const event: Event | null = await getEventById(eventId);

        if (!event) {
            response.status(HTTP_STATUS.NOT_FOUND).json({
                error: "Event not found",
            });
            return;
        }

        response.status(HTTP_STATUS.OK).json({
            message: "Event retrieved successfully",
            data: event,
        });
    } catch (error: unknown) {
        console.error("getEventByIdController error:", error);

        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to fetch event",
        });
    }
}

export async function updateEventController(
    request: Request,
    response: Response
): Promise<void> {
    try {
        const eventId: string | undefined = getSingleParam(request.params.id);

        if (!eventId) {
            response.status(HTTP_STATUS.BAD_REQUEST).json({
                error: "Event id is required",
            });
            return;
        }

        const updates: UpdateEventInput = request.body as UpdateEventInput;

        const updatedEvent: Event | null = await updateEventById(
            eventId,
            updates
        );

        if (!updatedEvent) {
            response.status(HTTP_STATUS.NOT_FOUND).json({
                error: "Event not found",
            });
            return;
        }

        response.status(HTTP_STATUS.OK).json({
            message: "Event updated successfully",
            data: updatedEvent,
        });
    } catch (error: unknown) {
        console.error("updateEventController error:", error);

        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to update event",
        });
    }
}

export async function deleteEventController(
    request: Request,
    response: Response
): Promise<void> {
    try {
        const eventId: string | undefined = getSingleParam(request.params.id);

        if (!eventId) {
            response.status(HTTP_STATUS.BAD_REQUEST).json({
                error: "Event id is required",
            });
            return;
        }

        const isDeleted: boolean = await deleteEventById(eventId);

        if (!isDeleted) {
            response.status(HTTP_STATUS.NOT_FOUND).json({
                error: "Event not found",
            });
            return;
        }

        response.status(HTTP_STATUS.OK).json({
            message: "Event deleted successfully",
        });
    } catch (error: unknown) {
        console.error("deleteEventController error:", error);

        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to delete event",
        });
    }
}