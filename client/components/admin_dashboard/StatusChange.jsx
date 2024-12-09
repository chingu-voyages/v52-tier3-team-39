import React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export default function StatusChange() {
  const [status, setStatus] = React.useState(["Requested"]);
  const appointment = await fetchSingleAppointment();

  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="status-label"> Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          value={appointment.status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={statusChoices[0]}>Requested</MenuItem>
          <MenuItem value={statusChoices[1]}>Confirmed</MenuItem>
          <MenuItem value={statusChoices[2]}>Scheduled</MenuItem>
          <MenuItem value={statusChoices[3]}>Completed</MenuItem>
          <MenuItem value={statusChoices[4]}>Canceled</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
