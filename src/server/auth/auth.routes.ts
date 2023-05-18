import { remult } from "remult";
import { User } from "../../shared/User";
import { API_ROOT_PATH_VERSION_1 } from "../../shared/utils";
import * as bcrypt from "bcrypt";
import { generateAccessToken } from ".";
import { logger } from "../logger";
import { Router } from "express";
import { api } from "../api";

export const authRouter = Router();

authRouter.post(
    `${API_ROOT_PATH_VERSION_1}/signIn`,
    api.withRemult,
    async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!(email && password)) {
                res.status(400).json(
                    !email ? "Email is required" : "Password is required",
                );
            }
            const user = await remult.repo(User).findFirst({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                res.status(200).json({
                    user,
                    token: generateAccessToken(user),
                });
            } else {
                res.status(400).json("Invalid Credentials");
            }
        } catch (err) {
            logger.log({
                level: "error",
                message: String(err),
            });
            res.status(500).json("Unexpected server error");
        }
    },
);
