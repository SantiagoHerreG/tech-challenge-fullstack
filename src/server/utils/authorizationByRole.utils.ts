import { Remult } from "remult";
import { User } from "../../shared/User";

export const isAuthorizedAsSuperadmin = (c: Remult | undefined) =>
    c?.isAllowed("superadmin");

export const isAdminAuthorizedForUsersApi = (
    entity: User | undefined,
    c: Remult | undefined,
) => !!c?.isAllowed("admin") && entity?.role === "user";

export const isUserAuthorizedToUpdate = (
    entity: User | undefined,
    c: Remult | undefined,
) =>
    entity?.id === c?.user?.id &&
    entity?.role === "user" &&
    entity.email === c?.user?.email;

export const usersApiAuthorization = (
    entity: User | undefined,
    c: Remult | undefined,
) => isAuthorizedAsSuperadmin(c) || isAdminAuthorizedForUsersApi(entity, c);
