import Appointment from "../models/appointments.model.js";
import appointmentSchema from "../validators/appointments.validator.js";
import emailHelper from "../utils/emailHelper.js";

export async function newAppointment(req, res, next) {
  try {
    const { error } = appointmentSchema.validate(req.body);

    // handle validation errors
    if (error) {
      res.status(422);
      return next({ message: error.details[0].message });
    }

    // send value to db
    const { earlyTimeHour, lateTimeHour, email, ...rest } = req.body;

    const newAppt = new Appointment({
      ...rest,
      email,
      userId: "Insert Id Here",
      timeRange: {
        earlyTimeHour,
        lateTimeHour,
      },
    });

    // await newAppt.save();

    // send mock appt confirmation email
    emailHelper(email, earlyTimeHour, lateTimeHour);

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

export async function getSingleAppointment(req, res, next) {
  const { email } = req.params;
  try {
    const appointment = await Appointment.findOne({ email });
    res.status(200);
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500);
    return next({ message: "An internal server error occurred" });
  }
}

export async function cancelAppointment(req, res, next) {
  const { email } = req.body;
  try {
    const response = await Appointment.updateOne(
      {
        email,
        status: { $in: ["Pending", "Confirmed"] },
      },
      { status: "Cancelled" }
    );

    if (!response.modifiedCount) {
      res.status(400);
      return next({ message: "Invalid request" });
    }

    res.status(200);
    res.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500);
    return next({ message: "An internal server error occurred" });
  }
}
