import { Stack } from "@mui/material";
import SiteInfo from "@/components/landing/SiteInfo";
import SignInCard from "@/components/signInCard";

export default function signIn() {
  return (
    <Stack
      gap={4}
      sx={{
        width: { xs: 19 / 20 },
        marginY: 6,
        marginX: "auto",
      }}
    >
      <SiteInfo />
      <SignInCard />
    </Stack>
  );
}
