import { Router } from "express";
import {
  getAllAppointments,
  getSingleAppointment,
  newAppointment,
  cancelAppointment,
} from "../controllers/appointments.controller.js";

const router = Router();

// POST "/appointments"
router.post("/", newAppointment);

// GET "/appointments"
router.get("/", getAllAppointments);

// GET "/appointments/:id"
//! update param to googleid
router.get("/:email", getSingleAppointment);

router.patch("/cancel", cancelAppointment);

export default router;
