import { User } from "../shared/User";

export enum EThemeMode {
    Dark = "dark",
    Light = "light",
}

export type TGlobalContextObject = {
    currentUser: User | null;
    setCurrentUser: (user: User) => void;
    removeUser: () => void;
};
