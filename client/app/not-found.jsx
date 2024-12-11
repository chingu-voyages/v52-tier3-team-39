import { Box, Stack, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function NotFound() {
  return (
    <Box sx={{ marginY: { xs: 6, sm: 12, md: 16 } }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <ErrorOutlineOutlinedIcon
          color="primary"
          sx={{ fontSize: { xs: 20, sm: 25, md: 35 } }}
        />
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          sx={{ fontSize: { xs: "1.6rem", sm: "2rem", md: "3rem" } }}
        >
          404 Not Found
        </Typography>
      </Stack>
      <Typography
        textAlign="center"
        marginTop={4}
        fontSize={{ xs: "1rem", sm: "1.2rem", md: "1.4rem" }}
      >
        The page you requested does not exist!
      </Typography>
    </Box>
  );
}
