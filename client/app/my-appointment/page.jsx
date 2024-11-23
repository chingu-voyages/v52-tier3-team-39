import { Suspense } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import MyAppointment from "@/components/appointment/MyAppointment";

export default async function MyAppointmentView() {
  const { user } = await getServerSession(authOptions);

  return (
    <Box>
      <Stack direction="column">
        <Typography component="h1" variant="h2">
          My Appointment
        </Typography>
        <Suspense fallback={<p>Loading...</p>}>
          <MyAppointment email={user.email} />
        </Suspense>
      </Stack>
    </Box>
  );
}
