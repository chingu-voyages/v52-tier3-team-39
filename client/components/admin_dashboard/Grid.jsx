"use client";

import { useState, useMemo } from "react";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Paper, Box } from "@mui/material";
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar";

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
  return `${formatTime(timeRange?.preferredEarlyTime)} - ${formatTime(
    timeRange?.preferredLateTime
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

const paginationModel = { page: 0, pageSize: 15 };

const Toolbar = () => (
  <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
    <GridToolbarExport />
  </GridToolbarContainer>
);

export default function Grid({ rows }) {
  const [searchText, setSearchText] = useState("");
  const [customRows, setCustomRows] = useState(rows);

  const columns = [
    {
      field: "visitOrder",
      headerName: "Visit Order",
      width: 190,
      valueGetter: (_, row) => row.schedule.order,
    },
    {
      field: "markVisited",
      headerName: "Mark as Visited",
      width: 190,
      renderCell: (params) => {
        const { id, markVisited } = params.row;
        return (
          <Button
            variant={markVisited ? "contained" : "outlined"}
            color="primary"
            onClick={() => toggleVisited(id)}
          >
            {markVisited ? "Visited" : "Need to Visit"}
          </Button>
        );
      },
    },
    { field: "status", headerName: "Status", width: 190 },
    {
      valueFormatter: formatName,
      field: "name",
      headerName: "Name",
      width: 190,
    },
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
      field: "address",
      headerName: "Address",
      width: 190,
    },
  ];

  const toggleVisited = (id) => {
    setCustomRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, markVisited: !row.markVisited } : row
      )
    );
  };

  const filteredRows = useMemo(() => {
    if (!searchText) return customRows;
    return customRows.filter((row) =>
      columns.some((col) => {
        const value = row[col.field];

        if (col.field === "dateCreated") {
          const formattedDate = formatDateCreated(new Date(value));
          return formattedDate.toLowerCase().includes(searchText.toLowerCase());
        }
        if (col.field === "timeRange") {
          const formattedTimeRange = formatTimeRange(value);
          return formattedTimeRange
            .toLowerCase()
            .includes(searchText.toLowerCase());
        }

        return value
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase());
      })
    );
  }, [searchText, customRows]);

  const onSearchChange = (value) => {
    setSearchText(value);
  };

  return (
    <Paper elevation={24}>
      <Box p={2}>
        <SearchBar onSearchChange={onSearchChange} searchText={searchText} />
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
            sorting: {
              sortModel: [
                {
                  field: "visitOrder",
                  sort: "asc",
                },
              ],
            },
          }}
          pageSizeOptions={[15, 10]}
          sx={{ border: 0, height: "100%" }}
          getRowHeight={() => "auto"}
          slots={{ toolbar: Toolbar }}
        />
      </Box>
    </Paper>
  );
}
