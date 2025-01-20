import { Suspense } from "react";
import { Typography, Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";
import Map from "../../components/admin_dashboard/Map";
import Spinner from "@/components/Spinner";
import { fetchAppointments } from "@/actions/form";
import UnauthorizedError from "@/components/errors/UnauthorizedError";

async function Dashboard({ token }) {
  const initAppointments = await fetchAppointments(token);

  // error message returned from server
  if (initAppointments.message) {
    return <UnauthorizedError msg={initAppointments.message} />;
  }

  console.log("dashboard", initAppointments);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ flex: 1, height: "50vh" }}>
        <ReservationTable token={token} initAppointments={initAppointments} />
      </Box>
      <Box sx={{ flex: 1, height: "50vh" }}>
        <Map appointments={initAppointments} />
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
        <Dashboard token={session.jwt} />
      </Suspense>
    </div>
  );
}
