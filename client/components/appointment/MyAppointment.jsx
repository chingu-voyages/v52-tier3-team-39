import { fetchSingleAppointment } from "@/actions/form";

export default async function MyAppointment({ email }) {
  const fetchResponse = await fetchSingleAppointment(email);
  if (!fetchResponse) {
    return <p>You have no appointments</p>;
  }
  return "Appointment goes here";
}
