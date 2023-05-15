import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";

export const errorMiddleware = (
    err: Error & { status?: number; errors?: unknown[] },
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    logger;
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
};