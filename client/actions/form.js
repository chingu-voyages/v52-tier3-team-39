"use server";

import { redirect } from "next/navigation";
import { serverUrl } from "@/constants";

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

  redirect("/success");
}
