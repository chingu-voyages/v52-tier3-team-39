import Link from "next/link";
import { Card, CardContent, List, Stack, Typography } from "@mui/material";
import CancelAppointment from "./CancelAppointment";

function convertHourTo12HourTime(hour) {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:00 ${period}`;
}

export default function AppointmentDetails({ formData }) {
  const {
    email,
    location: { address },
    status,
    notifications: { apptRequestEmailUrl, apptConfirmationEmailUrl },
    schedule: { scheduledDate, scheduledEarlyTime, scheduledLateTime },
  } = formData;
  const scheduledDateString = new Date(scheduledDate).toDateString();
  const scheduledTime = `${convertHourTo12HourTime(
    scheduledEarlyTime
  )} - ${convertHourTo12HourTime(scheduledLateTime)}`;
  const showCancelBtn = status === "Pending" || status === "Confirmed";

  return (
    <Card sx={{ mt: 4, padding: 2 }}>
      <CardContent>
        <List sx={{ marginY: 0 }}>
          <Stack gap={3}>
            <Typography
              component="h2"
              variant="h2"
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}
            >
              {address}
            </Typography>
            <Stack gap={2}>
              <Typography
                fontStyle="italic"
                sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}
              >
                {status}
              </Typography>
              <Stack gap={1 / 2}>
                <Typography sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}>
                  Date: {scheduledDateString || "N/A"}
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}>
                  Time: {scheduledTime}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Stack gap={1 / 2}>
                <Link
                  href={apptRequestEmailUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}>
                    View Mock Request Received Email
                  </Typography>
                </Link>
              </Stack>
              <Stack gap={1 / 2}>
                <Link
                  href={apptConfirmationEmailUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}>
                    View Mock Schedule Confirmation Email
                  </Typography>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </List>
      </CardContent>
      {showCancelBtn && <CancelAppointment email={email} />}
    </Card>
  );
}
