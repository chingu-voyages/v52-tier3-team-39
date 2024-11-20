"use client";

import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

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

export default function Grid({ rows }) {
  return (
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
  );
}
