import Box from "@mui/material/Box";
import Grid from "./Grid";

export default function ReservationTable({ appointments }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Grid rows={appointments} />
    </Box>
  );
}
