import { Suspense } from "react";
import { CircularProgress, Typography } from "@mui/material";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";
import Map from "../../components/admin_dashboard/Map";

export default function AdminDashboardView() {
  return (
    <div>
      <Typography variant="h1">Reservations:</Typography>
      <Suspense fallback={<CircularProgress />}>
        <ReservationTable />
        <Map />
      </Suspense>
    </div>
  );
}
