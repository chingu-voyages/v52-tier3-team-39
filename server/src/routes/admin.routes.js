import { Router } from "express";

const router = Router();

// GET "/admin-dashboard"
router.get("/");
// POST "/admin-dashboard/batch"
router.post("/batch", getDistanceMatrix);
// PATCH "/admin-dashboard/scheduler"
router.patch("/scheduler", createRoute);

export default router;
