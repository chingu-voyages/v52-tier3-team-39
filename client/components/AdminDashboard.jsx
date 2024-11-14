"use client";
import React, { useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

export default function AdminDashboard() {
  const rows: GridRowsProp = [
    {
      id: 1,
      col1: "confirmed",
      col2: "6a-8a",
      col3: "Targaryen",
      col4: "Daenerys",
      col5: "333-333-3333",
      col6: "iConquor@westeros.com",
      col7: "333 Dothraki Valley, Free City of Penthos, Esos 33333",
    },
    {
      id: 2,
      col1: "pending",
      col2: "2p-4p",
      col3: "Lannister",
      col4: "Tyrion",
      col5: "031-294-4822",
      col6: "iDrink@andKnowThings.com",
      col7: "699 Hand of the King Row, Here and There, Seven Kingdoms 00000",
    },
    {
      id: 3,
      col1: "requested",
      col2: "11a-1p",
      col3: "Stark",
      col4: "Arya",
      col5: "909-485-3822",
      col6: "aGirl@IsNoOne.com",
      col7: "39842 Northern Way, Many Faced God, Esos 33333",
    },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Status", width: 150 },
    { field: "col2", headerName: "Timeslot", width: 150 },
    { field: "col3", headerName: "Last Name", width: 150 },
    { field: "col4", headerName: "First Name", width: 150 },
    { field: "col5", headerName: "Phone", width: 150 },
    { field: "col6", headerName: "Email", width: 150 },
    { field: "col7", headerName: "Address", width: 150 },
  ];

  return (
    <div className="bg-green-500 bg-opacity-70 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Reservations:</h1>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
