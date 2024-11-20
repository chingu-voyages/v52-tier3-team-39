import { Suspense } from "react";
import { Typography } from "@mui/material";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";

export default async function AdminDashboardView() {
  return (
    <div>
      <Typography variant="h1">Reservations:</Typography>
      <Suspense fallback={<p>Loading...</p>}>
        <ReservationTable />
      </Suspense>
    </div>
  );
}
