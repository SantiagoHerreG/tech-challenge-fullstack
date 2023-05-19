import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { Box } from "@mui/material";
import AlbumCard from "../../SharedModule/AlbumCard/AlbumCard";

export default function HomePage() {
    const { currentUser } = useContext(GlobalContext);

    return (
        <Box marginTop={2}>
            {currentUser && (
                <AlbumCard
                    user={currentUser}
                    onDelete={() => {}}
                    onView={() => {}}
                />
            )}
        </Box>
    );
}
