import { BackendMethod, remult } from "remult";
import { Movement } from "./Movement";
import { User } from "./User";

export class MovementController {
    @BackendMethod({ allowed: true })
    static async removeFromAccount({
        userId,
        accountId,
    }: {
        userId: string;
        accountId: string;
    }) {
        const userFound = await remult.repo(User).findFirst({ id: userId });
        if (!userFound) {
            throw new Error("User is not valid");
        }

        const movementsOfUserInAccount = await remult.repo(Movement).find({
            where: { userId, accountId },
        });

        for (const elem of movementsOfUserInAccount) {
            if (!elem.deletedAt) {
                await remult
                    .repo(Movement)
                    .save({ ...elem, deletedAt: new Date() });
            }
        }
    }
}
