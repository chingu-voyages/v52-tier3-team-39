"use server";

import { serverUrl } from "@/constants";

// CREATE DISTANCE MATRIX
export async function convertBatchToMatrix(address_batch) {
  console.log("inside convert batch");
  try {
    const response = await fetch(
      serverUrl + `admin-dashboard/${address_batch}/batch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address_batch }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send addresses to the server");
  }
  revalidatePath("/admin-dashboard");
}
