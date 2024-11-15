import Joi from "joi";

const schema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/^[A-Za-z]+$/))
    .min(2)
    .max(30)
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: false },
  }),
  phone: Joi.string()
    .pattern(new RegExp(/^[0-9]*$/))
    .length(10),
  address: Joi.string().required(),
  earlyTimeHour: Joi.number().min(9).max(16).required(),
  lateTimeHour: Joi.number()
    .min(10)
    .max(17)
    .required()
    // check that lateTime > earlyTime
    .greater(Joi.ref("earlyTimeHour")),
});

export async function newAppt(req, res, next) {
  try {
    const { error, value } = schema.validate(req.body);

    // handle validation error
    if (error) {
      res.status(422);
      return next({ message: error.details[0].message });
    }

    console.log("value", value);

    // send value to db

    // success response
    res.status(201);
    res.json({ message: "OK" });
  } catch (error) {
    console.log(error);
    res.status(500);
    return next({ message: "An unknown server error occurred." });
  }
}
