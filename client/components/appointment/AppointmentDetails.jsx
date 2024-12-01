import Link from "next/link";
import {
  Card,
  CardContent,
  Divider,
  List,
  Stack,
  Typography,
} from "@mui/material";
import AppointmentListItem from "./AppointmentListItem";
import CancelAppointment from "./CancelAppointment";

function convertHourTo12HourTime(hour) {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:00 ${period}`;
}

export default function AppointmentDetails({ formData }) {
  const {
    name,
    email,
    phone,
    location: { address },
    status,
    notifications: { apptRequestEmailUrl },
    confirmedAppointmentDetails: {
      confirmedDate,
      confirmedEarlyTime,
      confirmedLateTime,
    },
  } = formData;
  const confirmedTime = `${convertHourTo12HourTime(
    confirmedEarlyTime
  )} - ${convertHourTo12HourTime(confirmedLateTime)}`;
  const showCancelBtn = status === "Pending" || status === "Confirmed";

  return (
    <Card sx={{ mt: 4, padding: 2 }}>
      <CardContent>
        <Stack gap={2}>
          <Typography
            component="h2"
            variant="h1"
            sx={{ fontSize: { xs: "1.2rem", lg: "1.5rem" } }}
          >
            Appointment Details
          </Typography>
          <Divider orientation="horizontal" />
        </Stack>
        <List sx={{ marginY: 2 }}>
          <Stack gap={4}>
            <Stack gap={1}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}
              >
                Contact Info
              </Typography>
              <Stack gap={1 / 2}>
                <AppointmentListItem label="Name" value={name} />
                <AppointmentListItem label="Email" value={email} />
                <AppointmentListItem label="Phone" value={phone} />
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}
              >
                Address
              </Typography>
              <Stack gap={1 / 2}>
                <AppointmentListItem value={address} />
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}
              >
                Scheduling
              </Typography>
              <Stack gap={1 / 2}>
                <AppointmentListItem label="Status" value={status} />
                <AppointmentListItem
                  label="Apppointment Date"
                  value={confirmedDate || "N/A"}
                />
                <AppointmentListItem
                  label="Appointment Time Range"
                  value={confirmedTime}
                />
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}
              >
                Additional Information
              </Typography>
              <Stack gap={1 / 2}>
                <Link
                  href={apptRequestEmailUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AppointmentListItem
                    value={"View Mock Request Received Email"}
                  />
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </List>
        <Typography
          fontStyle="italic"
          sx={{ "&::before": { content: '"* "' }, fontSize: "0.8rem" }}
        >
          Mock email expires after a few hours
        </Typography>
      </CardContent>
      {showCancelBtn && <CancelAppointment email={email} />}
    </Card>
  );
}
