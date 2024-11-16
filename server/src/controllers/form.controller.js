import formSchema from "../validators/form.validator.js";
import Form from "../models/form.model.js";

export async function newAppt(req, res, next) {
  try {
    const { error, value } = formSchema.validate(req.body);

    // handle validation errors
    if (error) {
      res.status(422);
      return next({ message: error.details[0].message });
    }

    const { earlyTimeHour, lateTimeHour, ...rest } = req.body;

    const newForm = new Form({
      ...rest,
      timeRange: {
        earlyTimeHour,
        lateTimeHour,
      },
    });

    // send value to db
    // const res = await newForm.save();

    // success response
    res.status(201);
    res.json({ message: "OK" });
  } catch (error) {
    console.log(error);
    res.status(500);
    return next({ message: "An unknown server error occurred." });
  }
}
