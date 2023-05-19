import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./SharedModule/Footer/Footer";
import Header from "./SharedModule/Header/Header";
import { Box, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalContextProvider from "./contexts/GlobalContextProvider";
import AuthHandler from "./auth/AuthHandler";
import { EThemeMode } from "./utils/types";
import {
    getLocalModeOrDefault,
    setLocalMode,
} from "./services/localStorageService/localStorageService";
import { themeFactory } from "./utils/UiThemeUtils";

export default function App() {
    const [mode, setMode] = useState<EThemeMode>(getLocalModeOrDefault());
    const theme = themeFactory(mode);

    const setThemeMode = useCallback(
        (newMode: EThemeMode) => {
            if (newMode !== mode) {
                setMode(newMode);
                setLocalMode(newMode);
            }
        },
        [mode],
    );

    return (
        <GlobalContextProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthHandler>
                    <Box
                        minHeight="100vh"
                        display="flex"
                        flexDirection="column"
                    >
                        <Header themeMode={mode} setThemeMode={setThemeMode} />
                        <main>
                            <Outlet />
                        </main>
                        <Footer />
                    </Box>
                </AuthHandler>
            </ThemeProvider>
        </GlobalContextProvider>
    );
}
