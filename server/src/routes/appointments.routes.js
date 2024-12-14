import { Router } from "express";
import {
  getAllAppointments,
  getSingleAppointment,
  getUsersAppointments,
  newAppointment,
  updateVisited,
  cancelAppointment,
  updateStatus,
} from "../controllers/appointments.controller.js";

const router = Router();

// POST "/appointments"
router.post("/", newAppointment);

// GET "/appointments"
router.get("/", getAllAppointments);

// GET "/appointments/:email"
router.get("/:email", getSingleAppointment);

// GET "/appointments/:email"/all
router.get("/:email/all", getUsersAppointments);

// PATCH "/appointments/cancel"
router.patch("/cancel", cancelAppointment);

// PATCH "/appointments/:id"
router.patch("/:id", updateVisited);

// PATCH "/appointments/:id/status-change"
router.patch("/:id/status-change", updateStatus);

export default router;
