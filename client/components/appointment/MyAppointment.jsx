import { fetchSingleAppointment } from "@/actions/form";
import NoAppointment from "./NoAppointment";
import AppointmentDetails from "./AppointmentDetails";

export default async function MyAppointment({ email }) {
  const fetchResponse = await fetchSingleAppointment(email);
  if (!fetchResponse) {
    return <NoAppointment />;
  }
  return <AppointmentDetails formData={fetchResponse} />;
}
