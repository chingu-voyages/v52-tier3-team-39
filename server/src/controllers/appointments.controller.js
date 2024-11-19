import Form from "../models/form.model.js";

export async function getAllAppointments(req, res, next) {
  try {
    const appointments = await Form.find();
    console.log("appts", appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500);
    return next({ message: "An internal server error occurred" });
  }
}
