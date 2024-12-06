"use client";

import { useState, useMemo } from "react";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Paper, Box, Tooltip } from "@mui/material";
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
      renderHeader: (params) => (
        <Tooltip
          title={`Click on ellipses to filter by ${params.colDef.headerName}`}
          placement="right-start"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 65],
                },
              },
            ],
          }}
        >
          <div>{`${params.colDef.headerName}`}</div>
        </Tooltip>
      ),
      valueGetter: (_, row) => row.schedule.order,
    },
    {
      field: "markVisited",
      headerName: "Mark as Visited",
      width: 190,
      renderHeader: (params) => (
        <Tooltip
          title={`Click on ellipses to filter by ${params.colDef.headerName}`}
          placement="right-start"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 65],
                },
              },
            ],
          }}
        >
          <div>{`${params.colDef.headerName}`}</div>
        </Tooltip>
      ),
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
    {
      field: "status",
      headerName: "Status",
      width: 190,
      renderHeader: (params) => (
        <Tooltip
          title={`Click on ellipses to filter by ${params.colDef.headerName}`}
          placement="right-start"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 65],
                },
              },
            ],
          }}
        >
          <div>{`${params.colDef.headerName}`}</div>
        </Tooltip>
      ),
    },
    {
      valueFormatter: formatName,
      field: "name",
      headerName: "Name",
      width: 190,
      renderHeader: (params) => (
        <Tooltip
          title={`Click on ellipses to filter by ${params.colDef.headerName}`}
          placement="right-start"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 65],
                },
              },
            ],
          }}
        >
          <div>{`${params.colDef.headerName}`}</div>
        </Tooltip>
      ),
    },
    {
      valueFormatter: formatDateCreated,
      field: "dateCreated",
      headerName: "Requested on",
      width: 190,
      renderHeader: (params) => (
        <Tooltip
          title={`Click on ellipses to filter by ${params.colDef.headerName}`}
          placement="right-start"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 65],
                },
              },
            ],
          }}
        >
          <div>{`${params.colDef.headerName}`}</div>
        </Tooltip>
      ),
    },
    {
      valueFormatter: formatTimeRange,
      field: "timeRange",
      headerName: "Timeslot",
      width: 190,
      renderHeader: (params) => (
        <Tooltip
          title={`Click on ellipses to filter by ${params.colDef.headerName}`}
          placement="right-start"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 65],
                },
              },
            ],
          }}
        >
          <div>{`${params.colDef.headerName}`}</div>
        </Tooltip>
      ),
    },
    {
      valueFormatter: formatPhone,
      field: "phone",
      headerName: "Phone",
      width: 190,
      renderHeader: (params) => (
        <Tooltip
          title={`Click on ellipses to filter by ${params.colDef.headerName}`}
          placement="right-start"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 65],
                },
              },
            ],
          }}
        >
          <div>{`${params.colDef.headerName}`}</div>
        </Tooltip>
      ),
    },
    { field: "email", headerName: "Email", width: 190 },
    {
      field: "address",
      headerName: "Address",
      width: 190,
      renderHeader: (params) => (
        <Tooltip
          title={`Click on ellipses to filter by ${params.colDef.headerName}`}
          placement="right-start"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 65],
                },
              },
            ],
          }}
        >
          <div>{`${params.colDef.headerName}`}</div>
        </Tooltip>
      ),
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

    const needToFormat = {
      dateCreated: (value) => formatDateCreated(new Date(value)),
      timeRange: (value) => formatTimeRange(value),
      markVisited: (value, row) =>
        row.markVisited ? "Visited" : "Need to Visit",
    };

    return customRows.filter((row) =>
      columns.some((col) => {
        const value = row[col.field];
        const formattedValue = needToFormat[col.field]
          ? needToFormat[col.field](value, row)
          : value;
        return formattedValue
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
