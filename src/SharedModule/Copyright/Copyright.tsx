import { Link, Typography } from "@mui/material";

export default function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"All Rights Reserved © "}
            <Link
                color="inherit"
                href="https://github.com/SantiagoHerreG/tech-challenge-fullstack"
            >
                Santiago Herrera
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
