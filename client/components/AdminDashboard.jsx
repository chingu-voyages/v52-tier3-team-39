"use client";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function AdminDashboard() {
  return (
    <div className="bg-green-500 bg-opacity-70 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Reservations:</h1>
      <div className="flex flex-col gap-3">
        <ul className="bg-white p-4 bg-opacity-60 rounded shadow">
          <li>
            <strong>Status:</strong>
          </li>
          <li>
            <strong>Timeslot:</strong>
          </li>
          <li>
            <strong>Name:</strong>
          </li>
          <li>
            <strong>Contact:</strong>
            <ul>
              <li className="mx-4">Phone:</li>
              <li className="mx-4">Email:</li>
              <li className="mx-4">Address:</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
