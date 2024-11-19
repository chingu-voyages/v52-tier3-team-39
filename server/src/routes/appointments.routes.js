import { Router } from "express";
import mongoose from "mongoose";
import { getAllAppointments } from "../controllers/appointments.controller.js";

const router = Router();

router.get("/", getAllAppointments);

export default router;
