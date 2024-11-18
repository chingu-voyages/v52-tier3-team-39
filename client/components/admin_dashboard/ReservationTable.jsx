"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { serverUrl } from "../../constants";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function AdminDashboard({ appointments, setAppointments }) {
  const status_options = ["Requested", "Confirmed", "Pending", "Visited"];

  const dummyVar = [
    {
      id: 1,
      visited: false,
      status: "Confirmed",
      dateCreated: "11/15/24",
      timeRange: "6a-8a",
      name: "Daenerys Targaryen",
      phone: "333-333-3333",
      email: "iConquor@westeros.com",
      address: "333 Dothraki Valley, Free City of Penthos, Valerya 33333",
    },
    {
      id: 2,
      visited: false,
      status: "Pending",
      dateCreated: "12/3/24",
      timeRange: "2p-4p",
      name: "Tyrion Lannister",
      phone: "031-294-4822",
      email: "iDrink@andKnowThings.com",
      address: "699 Hand of the King Row, Here and There, Seven Kingdoms 00000",
    },
    {
      id: 3,
      visited: false,
      status: "Requested",
      dateCreated: "12/24/24",
      timeRange: "11a-1p",
      name: "Arya Stark",
      phone: "909-485-3822",
      email: "aGirl@IsNoOne.com",
      address: "39842 Northern Way, Many Faced God, Esos 10101",
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getAppts = async () => {
      try {
        const response = await fetch("http://localhost:4000/appointments");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        const formattedData = data.map((item, index) => ({
          id: item.id || index + 1,
          name: formatName(item.name),
          status: item.status || "Requested",
          dateCreated: formatDateCreated(item.dateCreated),
          timeRange: `${formatTime(
            item.timeRange?.earlyTimeHour
          )} - ${formatTime(item.timeRange?.lateTimeHour)}`,
          phone: formatPhone(item.phone),
          email: item.email,
          address: item.address,
        }));
        setAppointments(data);
        setRows(formattedData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    getAppts();
  }, [setAppointments]);
  console.log("serverUrl", serverUrl);

  const formatName = (name) => {
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");
    return `${lastName}, ${firstName}`;
  };

  const formatTime = (hour) => {
    if (hour === null || hour === undefined) return "Unavailable";
    return hour <= 12 ? `${hour}a` : `${hour - 12}p`;
  };

  const formatDateCreated = (dateString) => {
    const date = new Date(dateString);
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
    { field: "status", headerName: "Status", width: 190 },
    { field: "name", headerName: "Name", width: 190 },
    { field: "dateCreated", headerName: "Requested on", width: 190 },
    { field: "timeRange", headerName: "Timeslot", width: 190 },
    { field: "phone", headerName: "Phone", width: 190 },
    { field: "email", headerName: "Email", width: 190 },
    { field: "address", headerName: "Address", width: 190 },
  ];

  const paginationModel = { page: 0, pageSize: 15 };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <div>
        <Typography variant="h3">Reservations:</Typography>
        <Paper elevation={24}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[15, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </Box>
  );
}
