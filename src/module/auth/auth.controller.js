import { Router } from "express";
import { generateAccessToken, getUserById, signIn, signUp } from "./auth.service.js";
import { auth } from "../../common/middleware/index.js";
import z from "zod"
import { BadRequestException } from "../../common/exception/error.exceptions.js";
const router = Router()
// sign up 
router.post("/signup", async (req, res) => {
    let data = await signUp(req.body)
    res.json(data)
})
// login
router.get("/signIn", async (req, res) => {

    const userLoginSchema = z.object({
        email: z.email(),
        password: z.string().max(20).min(5)
    })
    let { success, error } = userLoginSchema.safeParse(req.body)

    if (!success) {
        let extra = error.issues[0].message ? error.issues[0].message : "invalid data"
        return BadRequestException({ message: "invalid data", extra })
    }


    let data = await signIn(req.body)
    res.json(data)
})
// get user by id from token 
router.get("/get-user-by-id-token", auth, async (req, res) => {
    let data = await getUserById(req.user)
    res.json(data)
})
// generate access token from refresh token 
router.post("/generate-access-token", async (req, res) => {
    let accessToken = await generateAccessToken(req.body)
    res.json(accessToken)
})
export default router   