import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function Logo({
  logoSize,
  textSize,
  iconColor,
  mainColor,
  accent,
}) {
  return (
    <Stack direction="row" alignItems="center">
      <Box>
        <WbSunnyIcon className={iconColor} sx={{ fontSize: logoSize }} />
      </Box>
      <Link href="/" scroll={false}>
        <Typography
          variant="display"
          sx={{ fontSize: textSize }}
          className={accent}
        >
          <span className={mainColor}>Ray</span>
          Volution
        </Typography>
      </Link>
    </Stack>
  );
}
