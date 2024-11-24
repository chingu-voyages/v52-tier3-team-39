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
    address,
    status,
    date,
    timeRange: { earlyTimeHour, lateTimeHour },
  } = formData;
  const earlyTime = convertHourTo12HourTime(earlyTimeHour);
  const lateTime = convertHourTo12HourTime(lateTimeHour);
  const preferredTime = `${earlyTime} - ${lateTime}`;

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
                <AppointmentListItem label="Date" value={date || "N/A"} />
                <AppointmentListItem
                  label="Preferred Time"
                  value={preferredTime}
                />
              </Stack>
            </Stack>
          </Stack>
        </List>
      </CardContent>
      <CancelAppointment />
    </Card>
  );
}