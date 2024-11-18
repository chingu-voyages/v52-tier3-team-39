import Joi from "joi";

const formSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().trim(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .trim(),
  phone: Joi.string()
    .pattern(new RegExp(/^[0-9]*$/))
    .length(10)
    .trim(),
  address: Joi.string().required(),
  earlyTimeHour: Joi.number().min(9).max(16).required(),
  lateTimeHour: Joi.number()
    .min(10)
    .max(17)
    .required()
    // check that lateTime > earlyTime
    .greater(Joi.ref("earlyTimeHour")),
});

export default formSchema;
