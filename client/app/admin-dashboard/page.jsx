import { Suspense } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { spacing } from "@mui/system";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";
import Map from "../../components/admin_dashboard/Map";
import { fetchAppointments } from "@/actions/form";

async function Dashboard() {
  const initAppointments = await fetchAppointments();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ flex: 1, height: "50vh" }}>
        <ReservationTable initAppointments={initAppointments} />
      </Box>
      <Box sx={{ flex: 1, height: "50vh" }}>
        <Map initAppointments={initAppointments} />
      </Box>
    </Box>
  );
}
export default async function AdminDashboardView() {
  return (
    <div>
      <Typography variant="h1">Reservations:</Typography>
      <Suspense fallback={<CircularProgress />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
