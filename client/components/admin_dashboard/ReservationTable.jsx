import Box from "@mui/material/Box";
import { fetchAppointments } from "@/actions/form";
import Grid from "./Grid";

export default async function ReservationTable() {
  const rows = await fetchAppointments();

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Grid rows={rows} />
    </Box>
  );
}
