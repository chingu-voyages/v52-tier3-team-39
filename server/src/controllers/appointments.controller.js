export async function getAllAppointments(req, res, next) {
  try {
    const appointments = await Form.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500);
    next({ message: "An internal server error occurred" });
  }
}

// export async function updateAppointment(req, res, next, id) {
//   try {
//     const { id } = appointments.id;
//     const updateVisited = req.body;
//     const updatedAppointment = await newAppt.findByIdAndUpdate(
//       id,
//       updatedVisited,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedAppointment) {
//       res.status(404);
//       return next({ message: "Appointment not found" });
//     }

//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     console.error("Error updating appointment:", error);
//     res.status(500);
//     next({ message: "An internal server error occurred" });
//   }
// }
