import { Router } from "express";
import mongoose from "mongoose";
// import { newAppt } from "../controllers/form.controller.js";
import {
  getAllAppointments,
  updateAppointment,
} from "../controllers/admin_dashboard.controller.js";

const router = Router();

router.get("/admin-dashboard", getAllAppointments);

// router.post("/admin-dashboard", updateAppointment);

export default router;
