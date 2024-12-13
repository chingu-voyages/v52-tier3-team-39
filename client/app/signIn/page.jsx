import { Stack } from "@mui/material";
import SiteInfo from "@/components/landing/SiteInfo";
import Auth from "@/components/landing/Auth";

export default function signIn() {
  return (
    <Stack
      gap={4}
      sx={{
        width: { xs: 19 / 20 },
        marginY: 4,
        marginX: "auto",
      }}
    >
      <SiteInfo />
      <Auth />
    </Stack>
  );
}
