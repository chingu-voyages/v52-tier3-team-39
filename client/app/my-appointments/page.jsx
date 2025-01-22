import { Suspense } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import MyAppointment from "@/components/appointment/MyAppointment";
import Spinner from "@/components/Spinner";

export default async function MyAppointmentView() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be signed in to view appoinments</p>;
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
        <Stack gap={2}>
          <Typography
            component="h1"
            variant="h1"
            sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
          >
            My Appointments
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <AccountCircleOutlinedIcon sx={{ fontSize: "1.2rem" }} />
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
            >
              {session.user.email}
            </Typography>
          </Stack>
        </Stack>

        <Suspense fallback={<Spinner />}>
          <MyAppointment token={session.jwt} />
        </Suspense>
      </Stack>
    </Box>
  );
}
