import { Router } from "express";
import {
  getAllAppointments,
  getSingleAppointment,
  getUsersAppointments,
  newAppointment,
  updateVisited,
  cancelAppointment,
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

export default router;
