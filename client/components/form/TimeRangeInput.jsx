import dayjs from "dayjs";
import {
  Box,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const nineAM = dayjs().set("hour", 9).startOf("hour");
const tenAM = dayjs().set("hour", 10).startOf("hour");
const fourPM = dayjs().set("hour", 16).startOf("hour");
const fivePM = dayjs().set("hour", 17).startOf("hour");

// time range must be minimum of 1 hour
// earliest "early" time: 9am
// earliest "latest" time: 10am
// latest "early" time: 4pm
// latest "late" time: 5pm

export default function TimeRangeInput({
  earlyTime,
  setEarlyTime,
  lateTime,
  setLateTime,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="border rounded-lg p-4 mt-4">
        <Typography variant="subtitle2">
          Preferred Appointment Time Range
        </Typography>
        <Stack gap={2} className="mt-4">
          <Stack direction="column" className="w-full">
            <TimePicker
              label="Earliest"
              minTime={nineAM}
              maxTime={fourPM}
              timeSteps={{ minutes: 60 }}
              value={earlyTime}
              onChange={(newValue) => setEarlyTime(newValue.hour())}
            />
            <FormHelperText>Select a time between 9am and 4pm</FormHelperText>
          </Stack>
          <Stack direction="column" className="w-full">
            <TimePicker
              label="Latest"
              minTime={tenAM}
              maxTime={fivePM}
              timeSteps={{ minutes: 60 }}
              value={lateTime}
              onChange={(newValue) => setLateTime(newValue.hour())}
            />
            <FormHelperText>Select a time between 10am and 5pm</FormHelperText>
          </Stack>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
