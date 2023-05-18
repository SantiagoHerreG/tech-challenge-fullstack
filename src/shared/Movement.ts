import { Entity, Fields, IdEntity, Validators, remult } from "remult";
import { User } from "./User";

@Entity("movements", {
    allowApiCrud: ["superadmin", "admin"],
})
export class Movement extends IdEntity {
    @Fields.string({
        validate: Validators.required,
    })
    userId = "";

    @Fields.object<Movement>((options, remult) => {
        options.serverExpression = async (movement) => {
            const userFound = await remult.repo(User).findFirst({
                id: movement.userId,
            });
            if (!userFound) {
                throw new Error("User is not valid");
            }

            return userFound;
        };
        options.dbReadOnly = true;
    })
    user: User = new User();

    @Fields.string({
        validate: Validators.required,
    })
    accountId = "";

    @Fields.createdAt({
        allowApiUpdate: false,
    })
    createdAt = new Date();

    @Fields.date({
        allowNull: true,
    })
    deletedAt: Date | null = null;
}
