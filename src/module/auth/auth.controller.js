import { Router } from "express";
import { signIn, signUp } from "./auth.service.js";

const router = Router()
// sign up 
router.post("/signup", async (req, res) => {
    let data = await signUp(req.body)
    res.json(data)
})
// login 
router.get("/signIn", async (req, res) => {
    let data = await signIn(req.body)
    res.json(data)
})

export default router  