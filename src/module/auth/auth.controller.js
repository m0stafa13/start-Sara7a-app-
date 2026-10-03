import { Router } from "express";
import { signUp } from "./auth.service.js";

const router = Router()

router.post("/signup", async (req, res) => {
    let data = await signUp(req.body)
    res.json(data)
})

export default router