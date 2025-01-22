"use client";

import { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Box } from "@mui/material";
import { getColumns } from "./grid-components/columns";
import { Toolbar } from "./grid-components/toolbar";
import SearchBar from "./SearchBar";

const paginationModel = { page: 0, pageSize: 15 };

const columns = getColumns();

export default function Grid({ rows, refreshData, token }) {
  const [searchText, setSearchText] = useState("");

  const toggleVisited = async (id, status) => {
    await updateStatusOnServer(id, status, token);
    await refreshData();
  };

  const columns = useMemo(
    () => getColumns(refreshData, toggleVisited),
    [refreshData]
  );

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
