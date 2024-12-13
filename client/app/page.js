import { Button, Stack, Typography } from "@mui/material";
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
          <span className="text-branding">Ready to make an appointment?</span>{" "}
          Please click the button below.
        </Typography>
        <NewAppointment />
      </Stack>
    </Stack>
  );
}
