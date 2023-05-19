import { User } from "../../shared/User";
import { EThemeMode } from "../../utils/types";

const modeName = "ThemeMode" as const;
const tokenName = "AuthorizationToken" as const;
const userInSession = "UserInSession" as const;

export const getLocalModeOrDefault = (): EThemeMode => {
    const themeMode: string | null = localStorage.getItem(modeName) || "";

    if (Object.values(EThemeMode).includes(themeMode as EThemeMode)) {
        return themeMode as EThemeMode;
    }
    return EThemeMode.Dark;
};

export const setLocalMode = (value: EThemeMode) => {
    localStorage.setItem(modeName, value);
};

export const setToken = (token: string) => {
    localStorage.setItem(tokenName, token);
};

export const getAuthToken = (): string | null =>
    localStorage.getItem(tokenName) || null;

export const setUserInLocaStorage = (user: User) => {
    localStorage.setItem(userInSession, JSON.stringify(user));
};

export const getUserInLocalStorage = (): User | null => {
    const userFound = localStorage.getItem(userInSession);
    if (userFound) {
        return JSON.parse(userFound);
    }
    return null;
};
