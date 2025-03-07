"use client";
import React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { updateStatusOnServer } from "@/actions/form";

export default function StatusChange({ id, currentStatus }) {
  const handleChange = async (e, id) => {
    const newStatus = e.target.value;
    await updateStatusOnServer(id, newStatus);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="status-label"> Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          value={currentStatus}
          label="Status"
          onChange={(e) => handleChange(e, id)}
        >
          <MenuItem value={"Requested"}>Requested</MenuItem>
          <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
          <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
          <MenuItem value={"Completed"}>Completed</MenuItem>
          <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
