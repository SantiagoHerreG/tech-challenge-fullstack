import { Router } from "express";
import { MovementController } from "../../shared/MovementController";
import { api } from "../api";
import { API_ROOT_PATH_VERSION_1 } from "../../shared/utils";

export const router = Router();
router.post(
    `${API_ROOT_PATH_VERSION_1}/movements/remove`,
    api.withRemult,
    async (req, res) => {
        const { userId, accountId } = req.body;
        console.log({ userId, accountId });

        try {
            res.status(200).json(
                await MovementController.removeFromAccount({
                    userId,
                    accountId,
                }),
            );
        } catch (err: any) {
            res.status(404).json(`Error: ${err?.message || err}`);
        }
    },
);
