import { Box, Stack, Typography } from "@mui/material";
import NewAppointment from "./NewAppointment";

export default function NoAppointment() {
  return (
    <Stack gap={4} sx={{ marginY: { xs: 4, lg: 6 } }}>
      <Typography component="p" variant="body1" fontStyle="italic">
        You haven&apos;t scheduled any appointments.
      </Typography>
      <NewAppointment />
    </Stack>
  );
}
