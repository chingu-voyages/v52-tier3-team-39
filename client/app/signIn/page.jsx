import { Stack } from "@mui/material";
import SiteInfo from "@/components/landing/SiteInfo";
import Auth from "@/components/landing/Auth";

export default function signIn() {
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
      <Auth />
    </Stack>
  );
}
