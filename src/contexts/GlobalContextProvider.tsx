import { ReactNode, createContext, useState } from "react";
import { TGlobalContextObject } from "../utils/types";
import { User } from "../shared/User";
import { getUserInLocalStorage } from "../services/localStorageService/localStorageService";

export const GlobalContext = createContext<TGlobalContextObject>({
    currentUser: null,
    setCurrentUser: (_: User) => {},
    removeUser: () => {},
});

interface IGlobalContextProvider {
    children?: ReactNode;
}

const GlobalContextProvider = ({ children }: IGlobalContextProvider) => {
    const [user, setUser] = useState<User | null>(getUserInLocalStorage());

    const setCurrentUser = (user: User) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(null);
    };

    const value: TGlobalContextObject = {
        currentUser: user,
        setCurrentUser,
        removeUser,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
