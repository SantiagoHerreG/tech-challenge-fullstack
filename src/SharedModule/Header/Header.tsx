import {
    AppBar,
    Box,
    Button,
    Hidden,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import nightModeIcon from "../../assets/night-mode-on.png";
import nightModeOffIcon from "../../assets/night-mode-off.png";
import { EThemeMode } from "../../utils/types";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { setToken } from "../../services/localStorageService/localStorageService";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

interface IHeaderProps {
    themeMode: EThemeMode;
    setThemeMode: (a: EThemeMode) => void;
}

function Header({ themeMode, setThemeMode }: IHeaderProps) {
    const navigate = useNavigate();
    const { removeUser } = useContext(GlobalContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleLogOut = () => {
        removeUser();
        setToken("");
        handleClose();
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onNavigate = (path: string) => {
        setAnchorEl(null);
        if (path) {
            navigate(path);
        }
    };

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, pl: 4 }}
                >
                    <Hidden mdDown>Tech Challenge - Mind Teams</Hidden>
                </Typography>
                <Box justifySelf="end">
                    {themeMode === EThemeMode.Dark ? (
                        <Button>
                            <img
                                src={nightModeIcon}
                                onClick={() => {
                                    setThemeMode(EThemeMode.Light);
                                }}
                                alt="Change to Light Mode"
                            />
                        </Button>
                    ) : (
                        <Button>
                            <img
                                src={nightModeOffIcon}
                                onClick={() => setThemeMode(EThemeMode.Dark)}
                                alt="Change to Dark Mode"
                            />
                        </Button>
                    )}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 2 }}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={() => onNavigate("/")}>
                            <Button variant="text">Home</Button>
                        </MenuItem>
                        <MenuItem onClick={() => onNavigate("/users")}>
                            <Button variant="text">Users</Button>
                        </MenuItem>
                        <MenuItem onClick={() => onNavigate("/accounts")}>
                            <Button variant="text">Accounts</Button>
                        </MenuItem>
                        <MenuItem onClick={() => onNavigate("/movements")}>
                            <Button variant="text">Movements</Button>
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <Button variant="text">Logout</Button>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
