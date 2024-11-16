import formSchema from "../validators/form.validator.js";
import Form from "../models/form.model.js";

export async function newAppt(req, res, next) {
  try {
    const { error } = formSchema.validate(req.body);

    // handle validation errors
    if (error) {
      res.status(422);
      return next({ message: error.details[0].message });
    }

    // send value to db
    const { earlyTimeHour, lateTimeHour, ...rest } = req.body;
    const newForm = new Form({
      ...rest,
      timeRange: {
        earlyTimeHour: "hello",
        lateTimeHour,
      },
    });
    await newForm.save();

    // send success response
    res.status(201);
    res.json({ message: "ok" });
  } catch (error) {
    console.log(error);
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
