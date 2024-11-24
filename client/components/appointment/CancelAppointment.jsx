"use client";
import { useState } from "react";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

export default function CancelAppointment() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => handleOpen();
  return (
    <>
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
            >
              Cancel
            </Button>
            <Button variant="contained" sx={{ width: { xs: 1, sm: 1 / 2 } }}>
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
