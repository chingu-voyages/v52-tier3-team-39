import { Router } from "express";

// GET "/admin-dashboard"
router.get("/");
// PATCH "/admin-dashboard/scheduler"
router.patch("/scheduler", createRoute);

export default router;
