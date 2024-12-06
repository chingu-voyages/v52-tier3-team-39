import { Suspense } from "react";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";
import Map from "../../components/admin_dashboard/Map";
import { fetchAppointments } from "@/actions/form";

async function Dashboard() {
  const appointments = await fetchAppointments();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <ReservationTable appointments={appointments} />
      <Map appointments={appointments} />
    </Box>
  );
}
export default async function AdminDashboardView() {
  return (
    <Paper sx={{padding: 2}}>
      <Typography variant="h1">Reservations:</Typography>
      <Suspense fallback={<CircularProgress />}>
        <Dashboard />
      </Suspense>
    </Paper>
  );
}
