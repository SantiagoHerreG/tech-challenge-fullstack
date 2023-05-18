import { Account } from "./Account";
import { User } from "./User";

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

export const API_ROOT_PATH_VERSION_1 = "/api/v1";

export type MovementDetailed = {
    user: User;
    account: Account;
    createdAt: Date;
    deletedAt: Date | null;
};
