// user with "user" role is redirected to this page after log in
// form data is retrieved using googleid/email supplied by OAuth
// useServerSession retrieves logged in user's data
// create server action to get form info
// send form data to form display component via props

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function MyAppointmentView() {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ MyAppointmentView ~ session:", session);
  return <h1>My Appointment</h1>;
}
