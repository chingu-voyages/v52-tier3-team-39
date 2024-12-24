import { Box, Typography } from "@mui/material";
import { fetchUsersAppointments } from "@/actions/form";
import NoAppointment from "./NoAppointment";
import AppointmentDetails from "./AppointmentDetails";

export default async function MyAppointment({ token }) {
  const fetchResponse = await fetchUsersAppointments(token);
  if (!fetchResponse.length) {
    return <NoAppointment />;
  }

  return (
    <Box>
      {fetchResponse.map((appt) => (
        <AppointmentDetails key={appt._id} formData={appt} token={token} />
      ))}

      <Typography
        fontStyle="italic"
        sx={{
          "&::before": { content: '"* "' },
          fontSize: "0.8rem",
          marginTop: 2,
          padding: 2,
        }}
      >
        Mock emails expire after a few hours
      </Typography>
    </Box>
  );
}
