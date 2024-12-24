import { Router } from "express";
import {
  getAllAppointments,
  getSingleAppointment,
  getUsersAppointments,
  newAppointment,
  cancelAppointment,
} from "../controllers/appointments.controller.js";
import { checkAdmin } from "../middleware/auth.middleware.js";
import { updateStatus } from "../scheduling/scheduler.js";

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

// UPDATE APPOINTMENT STATUS (ADMIN ONLY)
// PATCH "/appointments/:id/status-change"
router.patch("/:id/status-change", checkAdmin, updateStatus);

// CANCEL A SINGLE APPOINTMENT
// PATCH "/appointments/:id/cancel"
router.patch("/:id/cancel", cancelAppointment);

export default router;
