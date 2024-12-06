"use client";

import { useState, useMemo } from "react";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Paper, Box } from "@mui/material";
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

const columns = [
  {
    field: "visitOrder",
    headerName: "Order",
    valueGetter: (_, row) => row.schedule.order,
    minWidth: 60, // This column doesn't autofit well for some reason. This is a bandaid
    align: "center"
  },
  { field: "status", headerName: "Status" },
  {
    valueFormatter: formatName,
    field: "name",
    headerName: "Name",
  },
  {
    valueFormatter: formatDateCreated,
    field: "dateCreated",
    headerName: "Requested On",
  },
  {
    valueFormatter: formatTimeRange,
    field: "timeRange",
    headerName: "Timeslot",
  },
  {
    valueFormatter: formatPhone,
    field: "phone",
    headerName: "Phone",
  },
  { field: "email", headerName: "Email" },
  {
    field: "address",
    headerName: "Address",
  },
];

const paginationModel = { page: 0, pageSize: 15 };

const Toolbar = () => (
  <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
    <GridToolbarExport />
  </GridToolbarContainer>
);

export default function Grid({ rows }) {
  const [searchText, setSearchText] = useState("");

  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    return rows.filter((row) =>
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
  }, [searchText, rows]);

  const onSearchChange = (value) => {
    setSearchText(value);
  };

  return (
    <>
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
        sx={{ border: 0 }}
        getRowHeight={() => "auto"}
        slots={{ toolbar: Toolbar }}
        autosizeOnMount
        autosizeOptions={{ includeHeaders: true, expand: true }}
      />
    </>
  );
}
