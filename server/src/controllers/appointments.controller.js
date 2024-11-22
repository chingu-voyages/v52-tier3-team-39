import Appointment from "../models/appointments.model.js";
import appointmentSchema from "../validators/appointments.validator.js";

export async function newAppointment(req, res, next) {
  try {
    const { error } = appointmentSchema.validate(req.body);

    // handle validation errors
    if (error) {
      res.status(422);
      return next({ message: error.details[0].message });
    }

    // send value to db
    const { earlyTimeHour, lateTimeHour, ...rest } = req.body;
    const newAppt = new Appointment({
      ...rest,
      timeRange: {
        earlyTimeHour,
        lateTimeHour,
      },
    });
    await newAppt.save();

    // send success response
    res.status(201);
    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    // Mongo validation error
    if (error.name === "ValidationError") {
      res.status(400);
      return next({
        message: "Invalid request",
      });
    }
    res.status(500);
    return next({
      message: "An internal server error occurred",
    });
  }
}

export async function getAllAppointments(req, res, next) {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500);
    return next({ message: "An internal server error occurred" });
  }
}
