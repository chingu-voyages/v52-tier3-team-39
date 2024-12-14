import { Box, Stack, Typography } from "@mui/material";
import SiteInfo from "@/components/landing/SiteInfo";
import NewAppointment from "@/components/appointment/NewAppointment";

export default function LandingView() {
  return (
    <Stack
      gap={4}
      sx={{
        width: { xs: 19 / 20, md: 3 / 4 },
        marginY: { xs: 4, lg: 8 },
        marginX: { xs: "auto", lg: 4, xl: 0 },
      }}
    >
      <SiteInfo />
      <Stack>
        <Typography>
          <Box component="span" sx={{ color: "var(--branding)" }}>
            Ready to make an appointment?
          </Box>{" "}
          Please click the button below.
        </Typography>
        <NewAppointment />
      </Stack>
    </Stack>
  );
}
