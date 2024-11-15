import { Box, InputLabel, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimeRangeInput() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="border rounded-lg p-4 mt-4">
        <Typography variant="subtitle2">Preferred Time</Typography>
        <Stack direction={{ md: "row" }} gap={2} className="mt-2">
          <Stack direction="column" className="w-full md:w-1/2">
            <InputLabel htmlFor="start-time" className="m-1">
              Earliest
            </InputLabel>
            <TimePicker id="start-time" />
          </Stack>
          <Stack direction="column" className="w-full md:w-1/2">
            <InputLabel htmlFor="end-time" className="m-1">
              Latest
            </InputLabel>
            <TimePicker id="end-time" />
          </Stack>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
