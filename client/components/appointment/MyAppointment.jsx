import { fetchUsersAppointments } from "@/actions/form";
import NoAppointment from "./NoAppointment";
import AppointmentDetails from "./AppointmentDetails";

export default async function MyAppointment({ email }) {
  const fetchResponse = await fetchUsersAppointments(email);
  if (!fetchResponse.length) {
    return <NoAppointment />;
  }

  return (
    <>
      {fetchResponse.map((appt) => (
        <AppointmentDetails formData={appt} />
      ))}
    </>
  );
}
