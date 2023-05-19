const dotenv = require("dotenv");
dotenv.config();
import jwt from "jsonwebtoken";
import { logger } from "../logger";
import { User } from "../../shared/User";
import { UserInfo } from "remult";

declare module "remult" {
    export interface UserInfo {
        email: string;
    }
}

export const generateAccessToken = function (user: User) {
    if (!process.env.TOKEN_SECRET) {
        throw new Error("Unexpected server error");
    }
    return jwt.sign({ ...user }, process.env.TOKEN_SECRET, {
        expiresIn: 30 * 60 * 1000,
    });
};

export const authenticateToken = function (req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    if (!process.env.TOKEN_SECRET) {
        throw new Error("Unexpected server error");
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            logger.log({
                level: "error",
                message: err.message || String(err.errors),
            });
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

export const getUserForRemult = (request: any) => {
    if (!request.user) {
        return Promise.resolve(undefined);
    }
    const userInfo: UserInfo = {
        id: request.user.id,
        roles: [request.user.role],
        name: request.user.name,
        email: request.user.email,
    };
    return Promise.resolve(userInfo);
};
