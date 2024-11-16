import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  timeRange: {
    earlyTimeHour: Number,
    lateTimeHour: Number,
  },
  dateCreated: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Visited"],
    default: "Pending",
  },
});

const Form = mongoose.model("Form", formSchema, "forms");

export default Form;
