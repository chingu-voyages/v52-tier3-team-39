import { Suspense } from "react";
import { Typography, Box } from "@mui/material";
import ReservationTable from "../../components/admin-dashboard/ReservationTable";
import Map from "../../components/admin-dashboard/Map";
import Spinner from "@/components/Spinner";
import { fetchAppointments } from "@/actions/form";

async function Dashboard() {
  const initAppointments = await fetchAppointments();

  console.log("dashboard", initAppointments);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ flex: 1, height: "50vh" }}>
        <ReservationTable appointments={initAppointments} />
      </Box>
      <Box sx={{ flex: 1, height: "50vh" }}>
        <Map appointments={initAppointments} />
      </Box>
    </Box>
  );
}
export default async function AdminDashboardView() {
  return (
    <div>
      <Typography variant="h1">Reservations:</Typography>
      <Suspense fallback={<Spinner />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
