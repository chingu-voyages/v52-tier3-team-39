export async function newAppt(req, res, next) {
  console.log(req.body);

  try {
    // validate request body
    // add data to db
    // send response
    res.status(201);
    res.json({ message: "OK" });
  } catch (error) {
    console.log(error);
  }
}
