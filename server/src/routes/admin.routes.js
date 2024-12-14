import { Router } from "express";
import { getOptimalRoute } from "../controllers/admin.controller.js";

const router = Router();

// GET "/admin-dashboard"
router.get("/");
// POST "/admin-dashboard/batch"
router.post("/batch", getOptimalRoute);
// PATCH "/admin-dashboard/scheduler"
// router.patch("/scheduler", createRoute);

export default router;
