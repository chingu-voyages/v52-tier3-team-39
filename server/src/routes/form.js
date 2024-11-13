import { Router } from "express";

const router = Router()

router.post("/", async (req, res) => {
    console.log(req.body)
    res.json({ message: "ok" })
})

export default router;