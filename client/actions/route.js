"use server";

import { serverUrl } from "@/constants";
import { revalidatePath } from "next/cache";

// CREATE DISTANCE MATRIX
export async function convertBatchToMatrix(address_batch) {
  try {
    const response = await fetch(serverUrl + `admin-dashboard/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address_batch }),
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
