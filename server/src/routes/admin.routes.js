import { Router } from "express";

// GET "/admin-dashboard"
router.get("/");
// POST "/admin-dashboard/batch"
router.post("/:coords/batch", getDistanceMatrix);
// PATCH "/admin-dashboard/scheduler"
router.patch("/scheduler", createRoute);

export default router;
