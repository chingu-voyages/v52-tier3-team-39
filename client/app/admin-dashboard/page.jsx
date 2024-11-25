import { Suspense } from "react";
import { CircularProgress, Typography } from "@mui/material";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardView() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>You must be an admin to view this page.</p>;
  }
  if (session.user.role === "admin") {
    return (
      <div>
        <Typography variant="h1">Reservations:</Typography>
        <Suspense fallback={<CircularProgress />}>
          <ReservationTable />
        </Suspense>
      </div>
    );
  } else {
    return redirect("/form");
  }
}
