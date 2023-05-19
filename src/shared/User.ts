import { Entity, Fields, IdEntity, Validators, remult } from "remult";
import { validateEmail } from "./utils";
import * as bcrypt from "bcrypt";
import {
    isUserAuthorizedToUpdate,
    usersApiAuthorization,
} from "../server/utils/authorizationByRole.utils";

@Entity<User>("users", {
    allowApiRead: ["superadmin", "admin"],
    allowApiInsert: (entity, c) => usersApiAuthorization(entity, c),
    allowApiDelete: (entity, c) => usersApiAuthorization(entity, c),
    allowApiUpdate: (entity, c) =>
        usersApiAuthorization(entity, c) || isUserAuthorizedToUpdate(entity, c),
    saving: async (entity) => {
        const usersWithSameEmail = await remult
            .repo(User)
            .find({ where: { email: entity.email } });

        if (usersWithSameEmail.length > 1) {
            throw new Error("Unexpected server error");
        }

        if (usersWithSameEmail.length) {
            const userInDatabase = usersWithSameEmail[0];
            if (userInDatabase.id !== entity.id) {
                throw new Error("User email is already registered");
            }
            entity.password =
                entity.password !== userInDatabase.password
                    ? await bcrypt.hash(entity.password, 10)
                    : userInDatabase.password;
        } else {
            entity.password = await bcrypt.hash(entity.password, 10);
        }
    },
})
export class User extends IdEntity {
    @Fields.string({
        validate: Validators.required,
    })
    name = "";

    @Fields.string({
        validate: async (user) => {
            if (!validateEmail(user.email)) {
                throw new Error("Invalid email");
            }
        },
    })
    email = "";

    @Fields.string({
        validate: Validators.required,
    })
    password = "";

    @Fields.string()
    englishLevel = "";

    @Fields.string()
    cvLink = "";

    @Fields.string()
    knowledge = "";

    @Fields.createdAt({
        allowApiUpdate: false,
    })
    createdAt = new Date();

    @Fields.updatedAt({
        allowApiUpdate: false,
    })
    updatedAt = new Date();

    @Fields.string({
        validate: (user) => {
            if (
                !user.role ||
                !["superadmin", "admin", "user"].includes(user.role)
            ) {
                throw new Error("Role is not valid");
            }
        },
    })
    role = "user";
}

export async function seed() {
    const userRepo = remult.repo(User);
    if ((await userRepo.count()) === 0) {
        await userRepo.insert([
            {
                name: "Jhon Doe",
                email: "jdoe@arkus.com",
                password: "1234",
                role: "superadmin",
            },
        ]);
    }
}
