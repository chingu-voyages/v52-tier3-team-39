import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Box, Stack } from "@mui/material";
import Nav from "./Nav";
import Logo from "./Logo";
import DarkMode from "./DarkMode";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <Box
      component="header"
      sx={{
        paddingY: { xs: 1, md: 1.5 },
        borderBottomWidth: 1,
        borderColor: "var(--branding)",
      }}
    >
      <Box
        sx={{
          width: { xs: 1 },
          maxWidth: "xl",
          marginX: "auto",
          paddingX: { xs: 2, sm: 4, xl: 2 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo
            logoSize={{ xs: 20, sm: 24, lg: 32 }}
            textSize={{ xs: 24, sm: 32, lg: 48 }}
            iconColor="text-brandingDark"
            mainColor="branding-gradient"
            accent="text-accent"
          />
          <Stack direction="row" alignItems="center" gap={{ xs: 0, lg: 8 }}>
            {session && <Nav session={session} />}
            <DarkMode />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
