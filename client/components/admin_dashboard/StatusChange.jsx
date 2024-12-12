import React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export default function StatusChange() {
  const [status, setStatus] = React.useState("Requested");

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
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={"Requested"}>Requested</MenuItem>
          <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
          <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
          <MenuItem value={"Completed"}>Completed</MenuItem>
          <MenuItem value={"Canceled"}>Canceled</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
