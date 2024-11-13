import { Box, Stack, Typography } from "@mui/material";
import Nav from "./Nav";

export default function Header() {
  return (
    <Box component="header" className="my-2">
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-500">
            <span className="text-yellow-500">Ray</span>Volution
          </span>
        </Stack>
        <Nav />
      </Stack>
    </Box>
  );
}
