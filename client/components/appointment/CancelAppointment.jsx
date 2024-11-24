"use client";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { cancelAppointment } from "@/actions/form";

export default function CancelAppointment({ email }) {
  // state
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  // handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => handleOpen();
  const handleConfirm = async () => {
    const res = await cancelAppointment(email);
    if (res) {
      setToast(true);
      setToastMsg(res.message);
    }
  };
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast(false);
    setToastMsg("");
  };
  return (
    <>
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
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 9 / 10, sm: 500 },
            bgcolor: "background.paper",
            boxShadow: 10,
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography>
            Are you sure you want to cancel your appointment?
          </Typography>
          <Stack
            gap={2}
            direction={{ xs: "column", sm: "row" }}
            sx={{ marginTop: 4 }}
          >
            <Button
              variant="outlined"
              color="warning"
              sx={{ width: { xs: 1, sm: 1 / 2 } }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ width: { xs: 1, sm: 1 / 2 } }}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box>
        <Button variant="outlined" color="warning" onClick={handleClick}>
          Cancel Appointment
        </Button>
      </Box>
    </>
  );
}
