import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: String,
  userId: String, // relation: User.googleId
  email: String,
  phone: String,
  address: String,
  timeRange: {
    earlyTimeHour: Number,
    lateTimeHour: Number,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  dateCreated: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Visited"],
    default: "Pending",
  },
});

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema,
  "appointments"
);

export default Appointment;
