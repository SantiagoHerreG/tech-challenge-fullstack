import { Alert, Snackbar } from "@mui/material";

export interface ErrorDialogProps {
  open: boolean;
  errorMessage?: string;
}

function ErrorToast({ open, errorMessage }: ErrorDialogProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
        {errorMessage || "There was an unexpected error!"}
      </Alert>
    </Snackbar>
  );
}

export default ErrorToast;
