import { Box, Stack, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Logo from "./Logo";
import FooterNav from "./FooterNav";

export default async function Footer() {
  const session = await getServerSession(authOptions);
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "var(--footer)",
        color: "var(--footer-text)",
      }}
    >
      <Stack
        gap={4}
        sx={{
          width: 1,
          maxWidth: "xl",
          marginX: "auto",
          paddingY: 4,
          paddingX: { xs: 2, sm: 4, xl: 2 },
        }}
      >
        <Logo
          logoSize={{ xs: 20, sm: 24 }}
          textSize={{ xs: 26, sm: 32 }}
          iconColor="text-white"
          accent="text-white"
          mainColor="text-white"
        />
        {session && <FooterNav session={session} />}
        <Typography sx={{ fontSize: 14, color: "white" }}>
          &copy; 2024, RayVolution
        </Typography>
      </Stack>
    </Box>
  );
}
