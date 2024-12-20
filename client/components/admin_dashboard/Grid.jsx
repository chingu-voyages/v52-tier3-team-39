"use client";

import { useState, useMemo } from "react";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Paper, Box, Tooltip } from "@mui/material";
import SearchBar from "./SearchBar";
import { getColumns } from "./grid-components/columns";
import { updateStatusOnServer } from "@/actions/form";

const paginationModel = { page: 0, pageSize: 15 };

const Toolbar = () => (
  <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
    <GridToolbarExport />
  </GridToolbarContainer>
);

export default function Grid({ rows, refreshData }) {
  const [searchText, setSearchText] = useState("");

  const toggleVisited = async (id, status) => {
    await updateStatusOnServer(id, status);
    await refreshData();
  };

  const columns = useMemo(
    () => getColumns(refreshData, toggleVisited),
    [refreshData]
  );

  const filteredRows = useMemo(() => {
    if (!searchText) return rows;

    const needToFormat = {
      dateCreated: (value) => formatDateCreated(new Date(value)),
      timeRange: (value) => formatTimeRange(value),
      markVisited: (value, row) =>
        row.markVisited ? "Visited" : "Need to Visit",
    };

    return rows.filter((row) =>
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
  }, [searchText, rows]);

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
