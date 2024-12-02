import Appointment from "../models/appointments.model.js";
import { appendSchedule } from "../scheduling/scheduler.js";
import appointmentSchema from "../validators/appointments.validator.js";
import sendEmail, {
  apptConfirmationEmailHtml,
  apptConfirmationEmailText,
  apptRequestEmailHtml,
  apptRequestEmailText,
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

    // return error if doc with matching address and "Pending" or "Confirmed" status exists
    const checkAddress = await Appointment.findOne({
      "location.address": address,
      status: { $in: ["Pending", "Confirmed"] },
    });

    if (checkAddress) {
      res.status(409); // Conflict
      return next({
        message:
          "An appointment for this address has already been scheduled. Please modify the existing appointment or choose a different address.",
      });
    }

    const coords = await geocodeAddress(address);

    // add request data to the database
    const appt = new Appointment({
      ...rest,
      email,
      userId: "Insert Id Here",
      preferredTimeRange: {
        preferredEarlyTime: earlyTimeHour,
        preferredLateTime: lateTimeHour,
      },
      location: { ...coords, address },
    });

    const newAppt = await appt.save();

    // send mock appt request email
    const requestEmailUrl = await sendEmail({
      toAddress: email,
      subject: "Appointment Request Received",
      text: apptRequestEmailText(req.body),
      html: apptRequestEmailHtml(req.body),
    });

    // update appointment details with dummy date and preferred time range
    const dateCreated = new Date(newAppt.dateCreated);
    const dummyDate = new Date(dateCreated.getTime() + 1000 * 60 * 60 * 24); // +1 day
    const updatedAppt = await Appointment.findByIdAndUpdate(
      { _id: newAppt._id },
      {
        schedule: {
          scheduledDate: dummyDate,
          scheduledEarlyTime: earlyTimeHour,
          scheduledLateTime: lateTimeHour,
        },
        status: "Confirmed",
      },
      { new: true }
    );

    // send mock appt confirmation email
    const confirmationEmailUrl = await sendEmail({
      toAddress: email,
      subject: "Your Appointment Has Been Confirmed",
      text: apptConfirmationEmailText(updatedAppt),
      html: apptConfirmationEmailHtml(updatedAppt),
    });

    if (requestEmailUrl && confirmationEmailUrl) {
      await Appointment.updateOne(
        { _id: newAppt._id },
        {
          notifications: {
            apptRequestEmailUrl: requestEmailUrl,
            apptConfirmationEmailUrl: confirmationEmailUrl,
          },
        }
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
    const withScheduling = appendSchedule(
      appointments.map((a) => a.toObject())
    );
    res.status(200).json(withScheduling);
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
    res.json(appointment || null);
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
