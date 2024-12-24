import { Router } from "express";
import {
  getAllAppointments,
  getSingleAppointment,
  getUsersAppointments,
  newAppointment,
  updateVisited,
  cancelAppointment,
} from "../controllers/appointments.controller.js";
import { checkAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// CREATE SINGLE APPOINTMENT
// POST "/appointments"
router.post("/", newAppointment);

// GET ALL APPOINTMENTS (ADMIN ONLY)
// GET "/appointments"
router.get("/", checkAdmin, getAllAppointments);

// GET USERS APPOINTMENTS
// GET "/appointments/user
router.get("/user", getUsersAppointments);

// GET USERS MOST RECENT APPOINTMENT
// GET "/appointments/user/latest"
router.get("/user/latest", getSingleAppointment);

// PATCH "/appointments/:id"
router.patch("/:id", updateVisited);

// CANCEL A SINGLE APPOINTMENT
// PATCH "/appointments/:id/cancel"
router.patch("/:id/cancel", cancelAppointment);

export default router;
