"use client";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { serverUrl } from "../../constants";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import fetchAppointments from "./lib/fetchAppointments";

const columns = [
  { field: "status", headerName: "Status", width: 190 },
  { field: "name", headerName: "Name", width: 190 },
  { field: "dateCreated", headerName: "Requested on", width: 190 },
  { field: "timeRange", headerName: "Timeslot", width: 190 },
  { field: "phone", headerName: "Phone", width: 190 },
  { field: "email", headerName: "Email", width: 190 },
  { field: "address", headerName: "Address", width: 190 },
];

const paginationModel = { page: 0, pageSize: 15 };

export default function ReservationTable({ rows }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <div>
        <Typography variant="h3">Reservations:</Typography>
        <Paper elevation={24}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[15, 10]}
            sx={{ border: 0 }}
            getRowHeight={() => "auto"}
          />
        </Paper>
      </div>
    </Box>
  );
}
