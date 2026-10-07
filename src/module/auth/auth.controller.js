import { Router } from "express";
import { getUserById, signIn, signUp } from "./auth.service.js";
import { auth } from "../../common/middleware/index.js";

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
// get user by id from token 

router.get("/get-user-by-id-token", auth, async (req, res) => {
    let data = await getUserById(req.userToken)
    res.json(data)
})

export default router   