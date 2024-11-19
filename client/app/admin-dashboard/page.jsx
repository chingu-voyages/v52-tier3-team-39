"use server";
import ReservationTable from "../../components/admin_dashboard/ReservationTable";
import { fetchAppointments } from "../../components/admin_dashboard/lib/fetchAppointments";

export default async function AdminDashboardView() {
  const rows = await fetchAppointments();

  return (
    <div>
      <ReservationTable rows={rows} />
    </div>
  );
}
