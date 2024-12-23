import { Suspense } from "react";
import { Typography, Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";
import Map from "../../components/admin_dashboard/Map";
import Spinner from "@/components/Spinner";
import { fetchAppointments } from "@/actions/form";

async function Dashboard({ token }) {
  const appointments = await fetchAppointments(token);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ flex: 1, height: "50vh" }}>
        <ReservationTable appointments={appointments} token={token} />
      </Box>
      <Box sx={{ flex: 1, height: "50vh" }}>
        <Map appointments={appointments} />
      </Box>
    </Box>
  );
}
export default async function AdminDashboardView() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Typography variant="h1">Reservations:</Typography>
      <Suspense fallback={<Spinner />}>
        <Dashboard token={session.accessToken} />
      </Suspense>
    </div>
  );
}
