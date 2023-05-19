import { createTheme } from "@mui/material";
import { EThemeMode } from "./types";

export const themeFactory = (mode: EThemeMode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: "#119bc5",
                light: "#b2b2b2",
                dark: "#133267",
                contrastText: "#080404",
            },
            secondary: {
                main: "#93b958",
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: ({ ownerState }) => ({
                        ...(ownerState.variant === "contained" && {
                            color: "#fff",
                        }),
                    }),
                },
            },
        },
    });
