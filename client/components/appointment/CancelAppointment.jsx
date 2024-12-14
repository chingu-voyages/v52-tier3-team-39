"use client";
import { useState } from "react";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { cancelAppointment } from "@/actions/form";
import ErrorToast from "../errors/ErrorToast";

export default function CancelAppointment({ email }) {
  // state
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [hasRuntimeError, setHasRuntimeError] = useState(false);

  const handleConfirm = async () => {
    try {
      // response is undefined unless server-side error msg is returned
      const res = await cancelAppointment(email);
      if (res) {
        setToast(true);
        setToastMsg(res.message);
      }
      setModal(false);
    } catch (err) {
      console.error(err);
      setHasRuntimeError(true);
    }
  };

  if (hasRuntimeError) {
    throw new Error("Failed to cancel the appointment due to a server error");
  }

  return (
    <>
      {/* ERROR TOAST */}
      <ErrorToast
        toast={toast}
        setToast={setToast}
        toastMsg={toastMsg}
        setToastMsg={setToastMsg}
      />

      {/* CONFIRMATION MODAL */}
      <Modal open={modal} onClose={() => setModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 9 / 10, sm: 500 },
            backgroundColor: "var(--background-accent)",
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
              onClick={() => setModal(false)}
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

      {/* CANCEL BUTTON */}
      <Box sx={{ marginY: 2 }}>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => setModal(true)}
        >
          Cancel Appointment
        </Button>
      </Box>
    </>
  );
}
