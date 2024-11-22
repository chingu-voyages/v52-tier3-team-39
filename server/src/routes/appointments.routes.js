import { Router } from "express";
import {
  getAllAppointments,
  getSingleAppointment,
  newAppointment,
} from "../controllers/appointments.controller.js";

const router = Router();

// POST "/appointments"
router.post("/", newAppointment);

// GET "/appointments"
router.get("/", getAllAppointments);

// GET "/appointments/:id"
router.get("/:id", getSingleAppointment);

export default router;
