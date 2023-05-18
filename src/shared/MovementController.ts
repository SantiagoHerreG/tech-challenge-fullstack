import { BackendMethod, remult } from "remult";
import { Movement } from "./Movement";
import { User } from "./User";
import { Account } from "./Account";
import { MovementDetailed } from "./utils";

export class MovementController {
    @BackendMethod({
        allowed: (_, c) => !!c?.isAllowed(["superadmin", "admin"]),
    })
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

    @BackendMethod({
        allowed: (_, c) => !!c?.isAllowed(["superadmin", "admin"]),
    })
    static async getAllMovementsDetailed(): Promise<MovementDetailed[]> {
        const allMovements = await remult.repo(Movement).find();

        const result: MovementDetailed[] = [];
        for (const elem of allMovements) {
            const user = await remult.repo(User).findFirst({ id: elem.userId });
            const account = await remult
                .repo(Account)
                .findFirst({ id: elem.accountId });
            if (!user || !account) {
                continue;
            }
            result.push({
                user,
                account,
                createdAt: elem.createdAt,
                deletedAt: elem.deletedAt,
            });
        }

        return result;
    }
}
