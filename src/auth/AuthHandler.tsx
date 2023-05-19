import { useContext, useState } from "react";
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../SharedModule/Copyright/Copyright";
import { GlobalContext } from "../contexts/GlobalContextProvider";
import {
    setToken,
    setUserInLocaStorage,
} from "../services/localStorageService/localStorageService";
import { logIn } from "../services/apiService/apiService";

export default function AuthHandler({ children }: { children: JSX.Element }) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { currentUser, setCurrentUser } = useContext(GlobalContext);

    const isAuthenticated = !!currentUser;

    const handleLogin = async () => {
        setIsLoading(true);

        const res = await logIn(email, password);
        if (res.ok) {
            const data = await res.json();
            setToken(data?.token);
            setCurrentUser(data?.user);
            setUserInLocaStorage(data?.user);
        } else alert("Login Error");

        setIsLoading(false);
    };

    return (
        <>
            {!isAuthenticated ? (
                isLoading ? (
                    <Backdrop open={isLoading}>
                        <CircularProgress />
                    </Backdrop>
                ) : (
                    <Grid container component="main" sx={{ height: "100vh" }}>
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage:
                                    "url(https://source.unsplash.com/random?wallpapers)",
                                backgroundRepeat: "no-repeat",
                                backgroundColor: (t) =>
                                    t.palette.mode === "light"
                                        ? t.palette.grey[50]
                                        : t.palette.grey[900],
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        <Grid
                            item
                            xs={12}
                            sm={8}
                            md={5}
                            component={Paper}
                            elevation={6}
                            square
                        >
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    sx={{ m: 1, bgcolor: "secondary.main" }}
                                >
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box
                                    component="form"
                                    noValidate
                                    onSubmit={() => {
                                        console.log("submit");
                                    }}
                                    sx={{ mt: 1 }}
                                >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="remember"
                                                color="primary"
                                            />
                                        }
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={handleLogin}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                {
                                                    "Don't have an account? Sign Up"
                                                }
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Copyright />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                )
            ) : (
                children
            )}
        </>
    );
}
