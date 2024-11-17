"use client";
import { useState, useEffect } from "react";
import ReservationTable from "../../components/ReservationTable";

export default function AdminDashboardView() {
  const [appointments, setAppointments] = useState([]);

  return (
    <div>
      <ReservationTable
        appointments={appointments}
        setAppointments={setAppointments}
      />
    </div>
  );
}
