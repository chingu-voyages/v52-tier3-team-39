import { Router } from "express";
import { newAppt } from "../controllers/form.controller.js";

const router = Router();

router.post("/", newAppt);

export default router;
