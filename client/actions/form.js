"use server";

import { revalidatePath } from "next/cache";
import { serverUrl } from "@/constants";

// CREATE NEW APPT
export async function requestAppt(formValues, token) {
  const response = await fetch(serverUrl + "appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formValues),
  });
  const data = await response.json();

  if (!response.ok) {
    return { message: data.message };
  }
}

// GET ALL APPTS
export async function fetchAppointments(token) {
  try {
    const response = await fetch(serverUrl + "appointments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    // return expected server error message
    if (data.message) {
      return { message: data.message };
    }

    // throw unexpected error
    if (!response.ok) {
      throw new Error(response.statusText);
    }

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
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch appointments");
  }
}

// GET SINGLE APPT
export async function fetchSingleAppointment(token) {
  try {
    const response = await fetch(serverUrl + `appointments/user/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch the appointment due to a server error");
  }
}

export async function fetchUsersAppointments(token) {
  try {
    const response = await fetch(serverUrl + `appointments/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch appointments due to a server error");
  }
}

// UPDATE SINGLE APPT STATUS
export async function cancelAppointment(id, token) {
  const response = await fetch(serverUrl + `appointments/${id}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return { message: data.message };
  }

  revalidatePath("/my-appointments");
}

export async function updateStatusOnServer(id, newStatus, token) {
  const response = await fetch(serverUrl + `appointments/${id}/status-change`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newStatus }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { message: data.message };
  }

  revalidatePath("/admin-dashboard");
}
