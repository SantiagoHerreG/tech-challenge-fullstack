import express, { Router } from "express";
import { MovementController } from "../../shared/MovementController";
import { api } from "../api";

export const router = Router();
router.post("/api/movements/remove", api.withRemult, async (req, res) => {
  const { userId, accountId } = req.body;
  console.log({ userId, accountId });

  try {
    res
      .status(200)
      .json(await MovementController.removeFromAccount({ userId, accountId }));
  } catch (err: any) {
    res.status(404).json(`Error: ${err?.message || err}`);
  }
});
