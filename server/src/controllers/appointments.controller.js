import Appointment from "../models/appointments.model.js";
import { appendSchedule } from "../scheduling/scheduler.js";
import appointmentSchema from "../validators/appointments.validator.js";
import sendEmail, {
  apptConfirmationEmailHtml,
  apptConfirmationEmailText,
  apptRequestEmailHtml,
  apptRequestEmailText,
} from "../utils/emailHelper.js";
import { getLatLong } from "../addresses/address.js";

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
      status: { $in: ["Pending", "Requested"] },
    });

    if (checkAddress) {
      res.status(409); // Conflict
      return next({
        message: "An appointment for this address has already been scheduled.",
      });
    }

    const { lat, long } = getLatLong(address);

    // add request data to the database
    const appt = new Appointment({
      ...rest,
      email,
      userId: "Insert Id Here",
      preferredTimeRange: {
        preferredEarlyTime: earlyTimeHour,
        preferredLateTime: lateTimeHour,
      },
      location: {
        address: address,
        lat: lat,
        lng: long,
      },
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
    const withScheduling = await appendSchedule(
      appointments.map((a) => ({
        ...a.toObject(),
        id: a.id,
      }))
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

export async function getUsersAppointments(req, res, next) {
  const { email } = req.params;
  try {
    const appointments = await Appointment.find({
      email,
      status: { $ne: "Cancelled" },
    })
      .sort({ dateCreated: -1 })
      .exec();
    res.status(200);
    res.json(appointments);
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

export async function updateVisited(req, res) {
  const { id } = req.params;

  try {
    const data = await Appointment.findById(id);
    console.log("data", data);
    if (!data) {
      return res.status(404).json({ message: "Could not grab data" });
    }
    const newStatus = data.status === "Confirmed" ? "Visited" : "Confirmed";
    data.status = newStatus;
    const visited = await data.save();
    console.log("server: visited", visited);
    return res.status(200).json(visited);
  } catch (error) {
    return res.status(500).json({ message: "Server error: updating status" });
  }
}
