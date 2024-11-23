import { Suspense } from "react";
import { CircularProgress, Typography } from "@mui/material";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";
import Map from "../../components/admin_dashboard/Map";
import { fetchAppointments } from "@/actions/form";

export default async function AdminDashboardView() {
  const appointments = await fetchAppointments();
  return (
    <div>
      <Typography variant="h1">Reservations:</Typography>
      <Suspense fallback={<CircularProgress />}>
        <ReservationTable />
        <Map appointments={appointments} />
      </Suspense>
    </div>
  );
}
