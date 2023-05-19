import { Box, Typography } from "@mui/material";
import Copyright from "../Copyright/Copyright";

function Footer() {
    return (
        <Box
            sx={{ bgcolor: "background.paper", p: 6, mt: "auto" }}
            component="footer"
        >
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Tech Challenge - Mind Teams
            </Typography>
            <Copyright />
        </Box>
    );
}

export default Footer;
