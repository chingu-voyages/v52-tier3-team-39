"use client";
import { redirect } from "next/navigation";
import { Button } from "@mui/material";

export default function NewAppointment() {
  function handleClick() {
    redirect("/new-appointment");
  }
  return (
    <Button onClick={handleClick} sx={{ width: "fit-content" }}>
      + New Appointment
    </Button>
  );
}
