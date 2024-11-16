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
});

const Form = mongoose.model("Form", formSchema, "forms");

export default Form;
