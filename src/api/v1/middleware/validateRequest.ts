import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema } from "joi";

export interface RequestValidationSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
};

export const validateRequest = (
    requestValidationSchemas: RequestValidationSchemas
): RequestHandler => {
    return (
        request: Request,
        response: Response,
        next: NextFunction
    ): void => {
        const validationErrors: string[] = [];

        if (requestValidationSchemas.body) {
            const bodyValidationResult = requestValidationSchemas.body.validate(
                request.body,
                validationOptions
            );

            if (bodyValidationResult.error) {
                validationErrors.push(
                    ...bodyValidationResult.error.details.map(
                        (detail) => detail.message
                    )
                );
            } else {
                request.body = bodyValidationResult.value;
            }
        }

        if (requestValidationSchemas.params) {
            const paramsValidationResult =
                requestValidationSchemas.params.validate(
                    request.params,
                    validationOptions
                );

            if (paramsValidationResult.error) {
                validationErrors.push(
                    ...paramsValidationResult.error.details.map(
                        (detail) => detail.message
                    )
                );
            } else {
                request.params = paramsValidationResult.value;
            }
        }

        if (requestValidationSchemas.query) {
            const queryValidationResult =
                requestValidationSchemas.query.validate(
                    request.query,
                    validationOptions
                );

            if (queryValidationResult.error) {
                validationErrors.push(
                    ...queryValidationResult.error.details.map(
                        (detail) => detail.message
                    )
                );
            } else {
                request.query = queryValidationResult.value;
            }
        }

        if (validationErrors.length > 0) {
            response.status(400).json({
                message: "Validation failed",
                errors: validationErrors,
            });
            return;
        }

        next();
    };
};

export default validateRequest;