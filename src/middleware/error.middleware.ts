import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { ZodError } from "zod";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        const errors = err.errors.map((e) => {
            const field = e.path.join(".");
            return {
                field,
                message: `${formatFieldName(field)}: ${e.message}`
            };
        });

        const first = errors[0];
        return res.status(400).json({
            success: false,
            message: first ? first.message : "Validation error",
            errors
        });
    }

    const status = err instanceof ApiError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";

    return res.status(status).json({
        success: false,
        message
    });
}

function formatFieldName(field: string) {
    if (!field) return "Field";
    const cleaned = field.replace(/_/g, " ");
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}