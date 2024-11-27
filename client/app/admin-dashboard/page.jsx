import { Suspense } from "react";
import { CircularProgress, Typography } from "@mui/material";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";
import Map from "../../components/admin_dashboard/Map";
import { fetchAppointments } from "@/actions/form";

async function Dashboard() {
  const appointments = await fetchAppointments();
  return (
    <>
      <ReservationTable appointments={appointments} />
      <Map appointments={appointments} />
    </>
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
