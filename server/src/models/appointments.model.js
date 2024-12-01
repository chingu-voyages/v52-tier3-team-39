import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: String,
  userId: String, // relation: User.googleId
  email: String,
  phone: String,
  preferredTimeRange: {
    preferredEarlyTime: Number,
    preferredLateTime: Number,
  },
  location: {
    address: String,
    lat: Number,
    lng: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Visited"],
    default: "Pending",
  },
  notifications: {
    apptRequestEmailUrl: String,
    apptConfirmationEmailUrl: String,
  },
  confirmedAppointmentDetails: {
    confirmedDate: Date,
    confirmedEarlyTime: Number,
    confirmedLateTime: Number,
  },
  dateCreated: { type: Date, default: Date.now },
});

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema,
  "appointments"
);

export default Appointment;
