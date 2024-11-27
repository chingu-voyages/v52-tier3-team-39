import Link from "next/link";
import { Box, Divider, List, ListItem, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { fetchSingleAppointment } from "@/actions/form";

export default async function SuccessView() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be signed in to make an appointment</p>;
  }

  const response = await fetchSingleAppointment(session.user.email);
  console.log("🚀 ~ SuccessView ~ response:", response);

  return (
    <Stack
      direction="column"
      gap={4}
      sx={{
        maxWidth: 500,
        marginTop: { xs: 8, md: 16 },
        marginX: "auto",
        padding: { xs: 0, sm: 2 },
      }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <CheckCircleOutlineIcon fontSize="large" color="primary" />
        <Typography variant="h6" component="h1" color="primary">
          Your appointment request has been received
        </Typography>
      </Stack>
      <Stack
        direction="column"
        alignItems={{ sm: "center" }}
        sx={{ paddingX: { xs: 0, sm: 2, md: 4 } }}
      >
        <Typography textAlign={{ sm: "center" }}>
          Hi {response.name}, we've received your request for an appointment at{" "}
          {response.address}.
        </Typography>
        <List sx={{ marginTop: 2 }}>
          <ListItem disableGutters>
            <Box
              component={Link}
              href={response.apptRequestEmail}
              target="_blank"
              rel="noreferrer"
            >
              <Stack direction="row" gap={2} alignItems="center">
                <EmailIcon fontSize="small" />
                <Typography variant="subtitle2">
                  View Mock <q>Request Received</q> Email
                </Typography>
              </Stack>
            </Box>
          </ListItem>
          <ListItem disableGutters>
            <Box component={Link} href="/my-appointments">
              <Stack direction="row" gap={2} alignItems="center">
                <ArticleIcon fontSize="small" />
                <Typography variant="subtitle2">
                  View Appointment Details
                </Typography>
              </Stack>
            </Box>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
}
