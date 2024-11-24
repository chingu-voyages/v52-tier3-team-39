import { Suspense } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import MyAppointment from "@/components/appointment/MyAppointment";

export default async function MyAppointmentView() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be signed in to make an appointment</p>;
  }

  return (
    <Box
      sx={{
        width: { xs: 1, sm: 4 / 5, md: 3 / 4, lg: 3 / 5 },
        marginY: { xs: 2, lg: 4 },
        marginX: "auto",
      }}
    >
      <Stack direction="column">
        <Typography
          component="h1"
          variant="h1"
          sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
        >
          My Appointments
        </Typography>
        <Suspense fallback={<p>Loading...</p>}>
          <MyAppointment email={session.user.email} />
        </Suspense>
      </Stack>
    </Box>
  );
}
