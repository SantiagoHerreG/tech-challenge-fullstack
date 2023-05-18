import { NextFunction, Request, Response } from "express";
import * as winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

export const logInfo = (req: Request, _res: Response, next: NextFunction) => {
    logger.log({
        level: "info",
        message: `${req.method} ${req.path} was requested`,
    });
    next();
};
