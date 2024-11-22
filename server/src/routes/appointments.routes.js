import { Router } from "express";
import {
  getAllAppointments,
  newAppointment,
} from "../controllers/appointments.controller.js";

const router = Router();

// GET "/appointments"
router.get("/", getAllAppointments);

// POST "/appointments"
router.post("/", newAppointment);

export default router;
