import Joi from "joi";

const schema = Joi.object({
  //! add regex to restrict to alpha only
  name: Joi.string().alphanum().min(2).max(30).required(),
  //! update tlds config (throws error if not present)
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  //! add regex to restrict to nums only
  phone: Joi.string().alphanum().length(10),
  address: Joi.string().required(),
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
