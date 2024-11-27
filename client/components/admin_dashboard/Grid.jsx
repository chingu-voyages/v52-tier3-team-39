"use client";

import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const formatName = (name) => {
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");
  if (!lastName) {
    return firstName;
  }
  return `${lastName}, ${firstName}`;
};

const formatTime = (hour) => {
  return hour <= 12 ? `${hour}a` : `${hour - 12}p`;
};

const formatTimeRange = (timeRange) => {
  return `${formatTime(timeRange?.earlyTimeHour)} - ${formatTime(
    timeRange?.lateTimeHour
  )}`;
};

const formatDateCreated = (date) => {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const formatPhone = (phone) => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

const formatAddress = (address) => {
  const [firstPart, ...rest] = address.split(",");
  const secondPart = rest.join(",").trim();
  return `${firstPart}\n${secondPart}`;
};

const columns = [
  { field: "status", headerName: "Status", width: 190 },
  { valueFormatter: formatName, field: "name", headerName: "Name", width: 190 },
  {
    valueFormatter: formatDateCreated,
    field: "dateCreated",
    headerName: "Requested on",
    width: 190,
  },
  {
    valueFormatter: formatTimeRange,
    field: "timeRange",
    headerName: "Timeslot",
    width: 190,
  },
  {
    valueFormatter: formatPhone,
    field: "phone",
    headerName: "Phone",
    width: 190,
  },
  { field: "email", headerName: "Email", width: 190 },
  {
    valueFormatter: formatAddress,
    field: "address",
    headerName: "Address",
    width: 190,
  },
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
