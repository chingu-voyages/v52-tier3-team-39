"use client";

import Box from "@mui/material/Box";
import Grid from "./Grid";
import Button from "@mui/material/Button";
import { convertBatchToMatrix } from "../../actions/route.js";

export default function ReservationTable({ appointments = [] }) {
  function createBatch(appointments) {
    return [...appointments]
      .sort((a, b) => a.dateCreated - b.dateCreated)
      .slice(0, 8)
      .map((appt) => ({
        id: appt._id,
        location: appt.location,
      }));
  }

  function handleRoute() {
    const batch = createBatch(appointments);
    console.log(batch);
    convertBatchToMatrix(batch);
  }

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Button variant="outlined" onClick={handleRoute}>
        Schedule new batch
      </Button>
      <Grid rows={appointments} />
    </Box>
  );
}
