"use server";

export async function requestAppt(formValues) {
  const response = await fetch("http://localhost:4000/form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formValues),
  });

  if (!response.ok) {
    console.log(response);
  }

  return { message: "Your appointment has been requested!" };
}
