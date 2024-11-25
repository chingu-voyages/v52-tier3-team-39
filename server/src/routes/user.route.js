import { Router } from "express";
import { checkRole } from "../controllers/user.controller.js";

const router = Router();

router.get("/", checkRole);

export default router;
