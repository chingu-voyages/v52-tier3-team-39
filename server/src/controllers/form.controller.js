import formSchema from "../validators/form.validator.js";
import Form from "../models/form.model.js";

export async function geocodeAddress(address) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`;

  try {
    const resp = await fetch(geocodeUrl);
    const data = await resp.json();
    console.log(data);
    if (data.status === "OK") {
      const geodata = data.results[0].geometry.location;
      console.log("geodata", geodata);

      return geodata;
    } else {
      throw new Error(`Geocoding issue: ${data.status}`);
    }
  } catch (error) {
    console.log("Geocoding error", error.message);
    throw error;
  }
}

export async function newAppt(req, res, next) {
  try {
    const { error } = formSchema.validate(req.body);

    // handle validation errors
    if (error) {
      res.status(422);
      return next({ message: error.details[0].message });
    }
    const { earlyTimeHour, lateTimeHour, address, ...rest } = req.body;
    // Geocoded address?
    const coords = await geocodeAddress(address);
    console.log("coords", coords);
    // send value to db

    const newForm = new Form({
      ...rest,
      timeRange: {
        earlyTimeHour,
        lateTimeHour,
      },
      location: coords,
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
