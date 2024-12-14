"use server";

import { serverUrl } from "@/constants";
import { revalidatePath } from "next/cache";

// CREATE DISTANCE MATRIX
export async function convertBatchToMatrix(batch_appts) {
  try {
    const response = await fetch(serverUrl + `admin-dashboard/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ batch_appts }),
    });

    const data = await response.json();

    revalidatePath("/admin-dashboard/batch");
    console.log("new: Sending batch to server...");

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send addresses to the server");
  }
}
