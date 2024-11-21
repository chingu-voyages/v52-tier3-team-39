"use server";

import { redirect } from "next/navigation";
import { serverUrl } from "@/constants";
import {
  formatName,
  formatAddress,
  formatDateCreated,
  formatPhone,
  formatTime,
} from "@/lib/fetchAppointments";

export async function requestAppt(formValues) {
  const response = await fetch(serverUrl + "form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formValues),
  });
  const data = await response.json();

  if (!response.ok) {
    return { message: data.message };
  }

  redirect("/form/success");
}

export async function fetchAppointments() {
  const response = await fetch(serverUrl + "appointments", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  const data = await response.json();
  console.log("🚀 ~ fetchAppointments ~ data:", data);
  return data.map((item, index) => ({
    id: item.id || index + 1,
    name: formatName(item.name),
    status: item.status ? item.status : "Requested",
    dateCreated: formatDateCreated(item.dateCreated),
    timeRange: `${formatTime(item.timeRange?.earlyTimeHour)} - ${formatTime(
      item.timeRange?.lateTimeHour
    )}`,
    phone: formatPhone(item.phone),
    email: item.email,
    address: formatAddress(item.address),
  }));
}
