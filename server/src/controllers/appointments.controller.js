import Appointment from "../models/appointments.model.js";
import appointmentSchema from "../validators/appointments.validator.js";
import sendEmail, {
  apptRequestConfirmationHtml,
  apptRequestConfirmationText,
} from "../utils/emailHelper.js";

export async function geocodeAddress(address) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`;

  const resp = await fetch(geocodeUrl);
  const data = await resp.json();
  console.log(data);
  if (data.status === "OK") {
    const geodata = data.results[0].geometry.location;
    console.log("geodata", geodata);

    return geodata;
  }
  throw new Error(`Geocoding issue: ${data.status}`);
}

export async function newAppointment(req, res, next) {
  try {
    // handle validation errors
    const { error } = appointmentSchema.validate(req.body);

    if (error) {
      res.status(422);
      return next({ message: error.details[0].message });
    }

    const { earlyTimeHour, lateTimeHour, address, email, ...rest } = req.body;
    const coords = await geocodeAddress(address);

    // add request data to the database
    const appt = new Appointment({
      ...rest,
      email,
      userId: "Insert Id Here",
      preferredTimeRange: {
        earlyTimeHour,
        lateTimeHour,
      },
      location: { ...coords, address },
    });

    const newAppt = await appt.save();

    // send mock appt request email, add url to the database
    const emailPreviewUrl = await sendEmail({
      toAddress: email,
      subject: "Appointment Request Received",
      text: apptRequestConfirmationText(req.body),
      html: apptRequestConfirmationHtml(req.body),
    });

    if (emailPreviewUrl) {
      await Appointment.updateOne(
        { _id: newAppt._id },
        { notifications: { apptRequestEmailUrl: emailPreviewUrl } }
      );
    }

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
    const [appointment] = await Appointment.find({ email })
      .sort({ dateCreated: -1 }) // sort descending order
      .limit(1)
      .exec();
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
