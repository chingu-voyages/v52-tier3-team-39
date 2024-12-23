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

// POST "/appointments"
router.post("/", newAppointment);

// GET "/appointments"
router.get("/", checkAdmin, getAllAppointments);

// GET "/appointments/user
router.get("/user", getUsersAppointments);

// GET "/appointments/user/latest"
router.get("/user/latest", getSingleAppointment);

// PATCH "/appointments/cancel"
router.patch("/cancel", cancelAppointment);

// PATCH "/appointments/:id"
router.patch("/:id", updateVisited);

export default router;
