import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { User } from "../../shared/User";

interface IAlbumCardProps {
    user: User;
    onView: (a: any) => void;
    onDelete: () => void;
}

export default function AlbumCard({ user, onView, onDelete }: IAlbumCardProps) {
    const title = `${user.name} ${dayjs(user.createdAt).format(
        "DD/MMM/YY HH:mm A",
    )}`;

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "50vw",
                margin: "auto",
            }}
        >
            <CardContent>
                <Typography sx={{ fontWeight: "600" }}>{title}</Typography>
                <Grid container spacing={2} sx={{ margin: "auto" }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography>Name</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ overflowWrap: "break-word" }}>
                                {user.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Email</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ overflowWrap: "break-word" }}>
                                {user.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Knowledge</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ overflowWrap: "break-word" }}>
                                {user.knowledge}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Created at</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ overflowWrap: "break-word" }}>
                                {dayjs(user.createdAt).format(
                                    "DD/MMM/YY HH:mm A",
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => onView(user)}
                >
                    View
                </Button>
                <Button size="small" onClick={onDelete} disabled>
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
}
