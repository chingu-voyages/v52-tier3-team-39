"use server";

import { revalidatePath } from "next/cache";
import { serverUrl } from "@/constants";

// CREATE NEW APPT
export async function requestAppt(formValues) {
  const response = await fetch(serverUrl + "appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formValues),
  });
  const data = await response.json();

  if (!response.ok) {
    return { message: data.message };
  }
}

// GET ALL APPTS
export async function fetchAppointments() {
  try {
    const response = await fetch(serverUrl + "appointments", {
      cache: "no-store",
    });

    if (!response.ok)
      throw new Error(
        `Failed to fetch appointments: ${response.status} ${response.statusText}`
      );

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
      schedule: {
        order: item.schedule.order,
        scheduledDate: new Date(item.schedule.scheduledDate),
      },
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch appointments");
  }
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

export async function updateStatusOnServer(id, newStatus) {
  const response = await fetch(serverUrl + `appointments/${id}/status-change`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newStatus }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { message: data.message };
  }

  revalidatePath("/admin-dashboard");
}
