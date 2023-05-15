import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";

export const notFoundMiddleware = (
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    logger.log({
        level: "info",
        message: req.url + " was not found",
    });
    res.status(404).json("The service requested was not found");
};
