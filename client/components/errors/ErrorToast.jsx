import { Alert, Snackbar } from "@mui/material";

export default function ErrorToast({ toast, toastMsg, setToast, setToastMsg }) {
  const handleToastClose = () => {
    setToast(false);
    setToastMsg("");
  };

  return (
    <Snackbar
      open={toast}
      autoHideDuration={6000}
      onClose={handleToastClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleToastClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toastMsg}
      </Alert>
    </Snackbar>
  );
}
