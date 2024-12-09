"use server";

import { revalidatePath } from "next/cache";
import { serverUrl } from "@/constants";

// CREATE NEW APPT
export async function requestAppt(formValues) {
  try {
    const response = await fetch(serverUrl + "appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });
    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }
  } catch (error) {
    throw error;
  }
}

// GET ALL APPTS
export async function fetchAppointments() {
  const response = await fetch(serverUrl + "appointments", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  const data = await response.json();

  return data.map((item, index) => ({
    id: item.id || index + 1,
    name: item.name,
    status: item.status ? item.status : "Requested",
    dateCreated: new Date(item.dateCreated),
    timeRange: item.preferredTimeRange,
    phone: item.phone,
    email: item.email,
    address: item.location.address,
    location: { lat: item.location.lat, lng: item.location.lng },
    schedule: item.schedule,
  }));
}

// GET SINGLE APPT
export async function fetchSingleAppointment(email) {
  try {
    const response = await fetch(serverUrl + `appointments/${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch the appointment due to a server error");
  }
}

export async function fetchUsersAppointments(email) {
  try {
    const response = await fetch(serverUrl + `appointments/${email}/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch appointments due to a server error");
  }
}

// UPDATE SINGLE APPT STATUS
export async function cancelAppointment(email) {
  const response = await fetch(serverUrl + "appointments/cancel", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { message: data.message };
  }

  revalidatePath("/my-appointments");
}
