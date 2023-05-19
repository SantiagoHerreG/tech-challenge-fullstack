import { useEffect, useState } from "react";
import {
    CircularProgress,
    Container,
    Grid,
    Stack,
    TablePagination,
    Typography,
} from "@mui/material";
import { User } from "../../shared/User";
import { remult } from "remult";
import ErrorToast from "../../SharedModule/ErrorToast/ErrorToast";
import AlbumCard from "../../SharedModule/AlbumCard/AlbumCard";

const userRepo = remult.repo(User);

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    const handleFetch = () => {
        setLoading(true);
        userRepo
            .find({ orderBy: { createdAt: "desc" }, page, limit })
            .then((usersResponse) => setUsers(usersResponse))
            .catch(() => setIsError(true))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <Container maxWidth={false} sx={{ maxWidth: "90%", pt: 4 }}>
            <ErrorToast open={isError} />
            {loading && (
                <Stack direction="row" justifyContent="center" pt={2}>
                    <CircularProgress />
                </Stack>
            )}
            <Grid container spacing={3}>
                {users.length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="h6" textAlign="center">
                            There are not Users yet.
                        </Typography>
                    </Grid>
                )}
                {users?.map((item, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                        <AlbumCard
                            user={item}
                            onView={() => {}}
                            // TODO: fix props and add functionality
                            onDelete={() => {}}
                        />
                    </Grid>
                ))}
            </Grid>
            {!!users.length && (
                <Stack direction="row" justifyContent="center" pt={2}>
                    <TablePagination
                        component="div"
                        count={users.length}
                        page={page}
                        onPageChange={(_, value) => {
                            setPage(value);
                            handleFetch();
                        }}
                        rowsPerPage={limit}
                        onRowsPerPageChange={(e) => {
                            setLimit(+e.target.value);
                            handleFetch();
                        }}
                        labelRowsPerPage="Items per page"
                        rowsPerPageOptions={[2, 5, 10, 50, 100]}
                    />
                </Stack>
            )}
        </Container>
    );
}
