// user with "user" role is redirected to this page after log in
// form data is retrieved using googleid/email supplied by OAuth
// useServerSession retrieves logged in user's data
// create server action to get form info
// send form data to form display component via props
// loading state
// null response state
// form data state

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { fetchSingleAppointment } from "@/actions/form";

export default async function MyAppointmentView() {
  const { user } = await getServerSession(authOptions);
  const fetchResponse = await fetchSingleAppointment(user.email);
  return <h1>My Appointment</h1>;
}
