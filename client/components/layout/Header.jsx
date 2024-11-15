"use client";

import { Box, Stack, Typography } from "@mui/material";
import Nav from "./Nav";

export default function Header() {
  return (
    <Box
      component="header"
      className="py-2 lg:py-4 px-4 border-b border-gray-200"
    >
      <Stack direction="row" className="justify-between items-center">
        <Typography variant="h5" component="h1">
          <Typography
            variant="h5"
            component="span"
            sx={{ color: (theme) => theme.palette.branding }}
          >
            Ray
          </Typography>
          Volution
        </Typography>
        <Nav />
      </Stack>
    </Box>
  );
}
