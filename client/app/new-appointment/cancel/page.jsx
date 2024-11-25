"use client";

import Link from "next/link";
import { Box, Divider, List, ListItem, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function FormCancelView() {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      divider={<Divider orientation="horizontal" flexItem />}
      gap={4}
      sx={{
        marginTop: { xs: 8, md: 16 },
        marginX: "auto",
        width: { md: "fit-content" },
      }}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <CheckCircleOutlineIcon fontSize="large" color="success" />
        <Typography variant="h6" component="h1" color="success">
          Your submission has been cancelled.
        </Typography>
      </Stack>
      <Stack direction="column" justifyContent="start">
        <Typography variant="subtitle1">
          Where would you like to go next?
        </Typography>
        <List sx={{ marginTop: 2 }}>
          <ListItem>
            <Box
              component={Link}
              href="/"
              sx={(theme) => ({ ":hover": { color: theme.palette.branding } })}
            >
              <Stack direction="row" gap={2} alignItems="center">
                <HomeIcon fontSize="small" />
                <Typography variant="subtitle2">Home</Typography>
              </Stack>
            </Box>
          </ListItem>
          <ListItem>
            <Box
              component={Link}
              href="/new-appointment"
              sx={(theme) => ({ ":hover": { color: theme.palette.branding } })}
            >
              <Stack direction="row" gap={2} alignItems="center">
                <CalendarMonthIcon fontSize="small" />
                <Typography variant="subtitle2">
                  Request an appointment
                </Typography>
              </Stack>
            </Box>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
}
