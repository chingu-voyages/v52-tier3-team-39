"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "./Grid";
import { fetchAppointments } from "@/actions/form";

export default function ReservationTable({ initAppointments }) {
  const [appointments, setAppointments] = useState(initAppointments);

  const refreshData = async () => {
    const updatedAppts = await fetchAppointments();
    setAppointments(updatedAppts);
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Grid rows={appointments} refreshData={refreshData} />
    </Box>
  );
}
