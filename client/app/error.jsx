"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function Error({ error, reset }) {
  // useEffect(() => {
  //   console.error(error);
  // }, [error]);

  return (
    <Stack
      sx={{
        marginX: "auto",
        border: "1px solid #eee",
        borderRadius: "0.5rem",
        backgroundColor: "#f9f9f9",
        width: "fit-content",
        paddingX: { xs: 2, sm: 4 },
        paddingY: 4,
        marginY: { xs: 6, sm: 12, md: 16 },
      }}
      alignItems="center"
      gap={4}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <ErrorOutlineOutlinedIcon
          color="error"
          sx={{ fontSize: { xs: 20, sm: 25, md: 35 } }}
        />
        <Typography
          variant="h1"
          component="h1"
          color="error"
          sx={{ fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2.2rem" } }}
        >
          Something went wrong!
        </Typography>
      </Stack>
      <Box>
        <Typography>{error.message}</Typography>
      </Box>
      <Stack
        gap={3}
        alignItems="center"
        sx={{ width: { xs: 3 / 4 }, marginTop: { xs: 4 } }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { xs: "0.8rem" },
            fontStyle: "italic",
          }}
        >
          Please try refreshing the page or come back later
        </Typography>
        <Button
          variant="outlined"
          size="large"
          color="error"
          onClick={() => reset()}
          sx={{ width: "fit-content" }}
        >
          Refresh
        </Button>
      </Stack>
    </Stack>
  );
}
