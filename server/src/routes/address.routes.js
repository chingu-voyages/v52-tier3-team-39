import { Router } from "express";
import { getAddressAutocompleteSuggestions } from "../controllers/address.controller.js";

const router = Router();

router.get("/autocomplete", getAddressAutocompleteSuggestions);

export default router;
