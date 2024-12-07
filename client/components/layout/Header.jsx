import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Box, Stack, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Nav from "./Nav";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <Box
      component="header"
      className="border-b border-gray-200"
      sx={{
        paddingY: { xs: 1, md: 1.5 },
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
          <Stack direction="row" alignItems="center">
            <Box>
              <WbSunnyIcon
                className="text-brandingDark"
                sx={{ fontSize: 32 }}
              />
            </Box>
            <Link href="/">
              <Typography
                variant="display"
                sx={{
                  fontSize: {
                    xs: "1.6rem",
                    sm: "2rem",
                    lg: "3rem",
                  },
                }}
                className="text-accent"
              >
                <span className="branding-gradient">Ray</span>
                Volution
              </Typography>
            </Link>
          </Stack>
          <Nav session={session} />
        </Stack>
      </Box>
    </Box>
  );
}
