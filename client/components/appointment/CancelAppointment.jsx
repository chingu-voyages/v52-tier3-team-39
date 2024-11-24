"use client";
import { Box, Button } from "@mui/material";

export default function CancelAppointment() {
  function handleClick() {
    console.log("clicked");
  }
  return (
    <Box>
      <Button variant="outlined" color="error" onClick={handleClick}>
        Cancel Appointment
      </Button>
    </Box>
  );
}
