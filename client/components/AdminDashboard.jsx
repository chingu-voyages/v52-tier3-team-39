"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

export default function AdminDashboard() {
  const status_options = ["Requested", "Confirmed", "Pending", "Visited"];

  const [rows, setRows] = useState([
    {
      id: 1,
      visited: false,
      status: "Confirmed",
      date: "11/15/24",
      time: "6a-8a",
      lastname: "Targaryen",
      firstname: "Daenerys",
      phone: "333-333-3333",
      email: "iConquor@westeros.com",
      address: "333 Dothraki Valley, Free City of Penthos, Valerya 33333",
    },
    {
      id: 2,
      visited: false,
      status: "Pending",
      date: "12/3/24",
      time: "2p-4p",
      lastname: "Lannister",
      firstname: "Tyrion",
      phone: "031-294-4822",
      email: "iDrink@andKnowThings.com",
      address: "699 Hand of the King Row, Here and There, Seven Kingdoms 00000",
    },
    {
      id: 3,
      visited: false,
      status: "Requested",
      date: "12/24/24",
      time: "11a-1p",
      lastname: "Stark",
      firstname: "Arya",
      phone: "909-485-3822",
      email: "aGirl@IsNoOne.com",
      address: "39842 Northern Way, Many Faced God, Esos 10101",
    },
  ]);

  const columns = [
    {
      field: "visited",
      headerName: "Mark as visited",
      width: 150,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.row.visited}
          onChange={() => handleVisited(params.row.id)}
        />
      ),
    },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "time", headerName: "Timeslot", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
  ];

  const handleVisited = (id) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              col1: !row.col1,
              col2: !row.col1 ? "Visited" : "Pending",
            }
          : row
      )
    );
  };

  const paginationModel = { page: 0, pageSize: 15 };

  return (
    <div className="bg-green-100 p-8 rounded-lg shadow-lg">
      <Typography
        variant="h3"
        className="text-2xl text-stone-800 font-semibold mb-4"
      >
        Reservations:
      </Typography>
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
