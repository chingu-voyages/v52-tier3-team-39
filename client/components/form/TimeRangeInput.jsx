import { useState } from "react";
import dayjs from "dayjs";
import { Box, FormHelperText, Stack, Typography } from "@mui/material";
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
  errorPath,
  setDisableBtn,
  isPending,
}) {
  const [earlyTimeErr, setEarlyTimeErr] = useState(null);
  const [lateTimeErr, setLateTimeErr] = useState(null);

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
              onError={(err) => {
                setDisableBtn(err);
                setEarlyTimeErr(err);
              }}
              onSelectedSectionsChange={() => {
                if (!dayjs(earlyTime).isValid()) {
                  setEarlyTime(nineAM);
                } else {
                  setEarlyTime(earlyTime.minute(0).second(0));
                }
              }}
              onChange={(newValue) => {
                setEarlyTime(newValue);
              }}
              disabled={isPending}
            />
            <FormHelperText>Select a time between 9am and 4pm</FormHelperText>
            {earlyTimeErr && (
              <FormHelperText error>
                {earlyTimeErr === "minTime"
                  ? "Time cannot be before 9am"
                  : "Time cannot be after 4pm"}
              </FormHelperText>
            )}
          </Stack>
          <Stack direction="column" className="w-full">
            <TimePicker
              label="Latest"
              minTime={tenAM}
              maxTime={fivePM}
              timeSteps={{ minutes: 60 }}
              value={lateTime}
              onError={(err) => {
                setDisableBtn(err);
                setLateTimeErr(err);
              }}
              onSelectedSectionsChange={() => {
                if (!dayjs(lateTime).isValid()) {
                  setLateTime(tenAM);
                } else {
                  setLateTime(lateTime.minute(0).second(0));
                }
              }}
              onChange={(newValue) => {
                setLateTime(newValue);
              }}
              disabled={isPending}
            />
            <FormHelperText>Select a time between 10am and 5pm</FormHelperText>
            {lateTimeErr && (
              <FormHelperText error>
                {lateTimeErr === "minTime"
                  ? "Time cannot be before 10am"
                  : "Time cannot be after 5pm"}
              </FormHelperText>
            )}
          </Stack>
          {errorPath && errorPath === "lateTimeHour" && (
            <FormHelperText error>
              Invalid time range. Please make sure the time range is at least 1
              hour.
            </FormHelperText>
          )}
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
