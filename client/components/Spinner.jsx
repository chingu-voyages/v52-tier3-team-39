import { Box, CircularProgress } from "@mui/material";

export default function Spinner() {
  return (
    <Box sx={{ marginTop: 12, marginX: "auto" }}>
      <CircularProgress sx={{ color: "var(--branding)" }} />
    </Box>
  );
}
