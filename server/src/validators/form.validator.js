import Joi from "joi";

const formSchema = Joi.object({
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

export default formSchema;
