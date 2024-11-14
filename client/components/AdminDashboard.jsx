"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function AdminDashboard() {
  const [hasVisited, setHasVisited] = useState(false);
  const status_options = ["Requested", "Confirmed", "Pending", "Visited"];

  const [rows, setRows] = useState([
    {
      id: 1,
      col1: hasVisited,
      col2: "Confirmed",
      col3: "6a-8a",
      col4: "Targaryen",
      col5: "Daenerys",
      col6: "333-333-3333",
      col7: "iConquor@westeros.com",
      col8: "333 Dothraki Valley, Free City of Penthos, Valerya 33333",
    },
    {
      id: 2,
      col1: hasVisited,
      col2: "Pending",
      col3: "2p-4p",
      col4: "Lannister",
      col5: "Tyrion",
      col6: "031-294-4822",
      col7: "iDrink@andKnowThings.com",
      col8: "699 Hand of the King Row, Here and There, Seven Kingdoms 00000",
    },
    {
      id: 3,
      col1: hasVisited,
      col2: "Requested",
      col3: "11a-1p",
      col4: "Stark",
      col5: "Arya",
      col6: "909-485-3822",
      col7: "aGirl@IsNoOne.com",
      col8: "39842 Northern Way, Many Faced God, Esos 10101",
    },
  ]);

  const columns = [
    {
      field: "col1",
      headerName: "Mark as visited",
      //   type: "boolean",
      width: 150,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.row.visited}
          onChange={() => handleVisited(params.row.id)}
        />
      ),
    },
    { field: "col2", headerName: "Status", width: 150 },
    { field: "col3", headerName: "Timeslot", width: 150 },
    { field: "col4", headerName: "Last Name", width: 150 },
    { field: "col5", headerName: "First Name", width: 150 },
    { field: "col6", headerName: "Phone", width: 150 },
    { field: "col7", headerName: "Email", width: 150 },
    { field: "col8", headerName: "Address", width: 150 },
  ];

  const handleVisited = (id) => {
    setHasVisited(!hasVisited);
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              col1: hasVisited,
              col2: hasVisited ? "Visited" : row.status,
            }
          : row
      )
    );
  };

  const paginationModel = { page: 0, pageSize: 15 };

  return (
    <div className="bg-green-100 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl text-stone-800 font-semibold mb-4">
        Reservations:
      </h1>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[15, 10]}
          sx={{ border: 0 }}
        />
      </div>
    </div>
  );
}
