"use client";
import React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { updateStatusOnServer } from "@/actions/form";

export default function StatusChange({ id, refreshData, currentStatus }) {
  const [status, setStatus] = React.useState(currentStatus);

  console.log("StatusChange component rendered for id:", id);

  const handleChange = async (e, id) => {
    const newStatus = e.target.value;
    console.log("newStatus", newStatus);
    setStatus(newStatus);
    await updateStatusOnServer(id, newStatus);
    refreshData();
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
          onChange={(e) => handleChange(e, id)}
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
