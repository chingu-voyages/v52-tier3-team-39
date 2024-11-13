import { useState } from "react";

export default function AdminDashboard() {
  return (
    <div className="bg-green-500 bg-opacity-40 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Reservations:</h1>
      <div className="flex flex-col gap-3">
        <div className="bg-white p-4 bg-opacity-40 rounded shadow">
          <p>
            <strong>Status:</strong>
          </p>
          <p>
            <strong>Timeslot:</strong>
          </p>
          <p>
            <strong>Contact:</strong>
            <p className="mx-4">Email:</p>
            <p className="mx-4">Phone:</p>
          </p>
        </div>
      </div>
    </div>
  );
}
