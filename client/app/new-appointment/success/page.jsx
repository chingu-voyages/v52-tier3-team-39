import Link from "next/link";
import { Box, Divider, List, ListItem, Stack, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { fetchSingleAppointment } from "@/actions/form";

export default async function SuccessView() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be signed in to make an appointment</p>;
  }

  const response = await fetchSingleAppointment(session.accessToken);

  return (
    <Stack
      direction="column"
      gap={4}
      sx={{
        maxWidth: 500,
        marginY: { xs: 8, md: 12 },
        marginX: "auto",
        padding: { xs: 0, sm: 2 },
      }}
      divider={
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ borderColor: "var(--border)" }}
        />
      }
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: 24 },
          textAlign: "center",
          color: "var(--branding)",
        }}
      >
        We received your request
      </Typography>
      <Stack
        direction="column"
        alignItems={{ sm: "center" }}
        sx={{ paddingX: { xs: 0, sm: 2, md: 4 } }}
      >
        <Typography textAlign={{ sm: "center" }}>
          Hi {response.name}, we've received your request for an appointment at{" "}
          {response.location.address}.
        </Typography>
        <List sx={{ marginTop: 2 }}>
          <ListItem disableGutters>
            <Box
              component={Link}
              href={response?.notifications?.apptRequestEmailUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Stack direction="row" gap={2} alignItems="center">
                <EmailOutlinedIcon fontSize="small" />
                <Typography sx={{ fontSize: 14 }}>
                  View Mock <q>Request Received</q> Email
                </Typography>
              </Stack>
            </Box>
          </ListItem>
          <ListItem disableGutters>
            <Box component={Link} href="/my-appointments">
              <Stack direction="row" gap={2} alignItems="center">
                <ArticleOutlinedIcon fontSize="small" />
                <Typography sx={{ fontSize: 14 }}>
                  View Appointment Details
                </Typography>
              </Stack>
            </Box>
          </ListItem>
        </List>
      </Stack>
      <Typography
        sx={{
          "&::before": { content: '"* "' },
          fontSize: "0.8rem",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Mock email expires after a few hours
      </Typography>
    </Stack>
  );
}
