import { Box, Stack } from "@mui/material";
import Nav from "./Nav";

export default function Header() {
  return (
    <Box
      component="header"
      className="py-2 lg:py-4 px-4 border-b border-gray-200"
    >
      <Stack direction="row" className="justify-between items-center">
        <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-500">
          <span className="text-yellow-500">Ray</span>Volution
        </span>
        <Nav />
      </Stack>
    </Box>
  );
}
