import { Router } from "express";
import { generateAccessToken, getAllUser, getUserById, resendOtp, signIn, signUp, verifyAccount } from "./auth.service.js";
import { auth, checkRole, upload } from "../../common/middleware/index.js";
import { userLoginSchema, userSignupSchema } from "./auth.validation.js";
import { validation } from "../../common/service/validation.service.js";

const router = Router()
// sign up 
// upload is middleware to upload image 
// validation is middleware to validate input using zod 
router.post("/signup", upload().single("image"), validation(userSignupSchema), async (req, res) => {
    let data = await signUp(req.data, req.file)
    res.json(data)
})
// login
router.get("/signIn", validation(userLoginSchema), async (req, res) => {
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
// verify email 
router.put("/verify-account", async (req, res) => {
    let data = await verifyAccount(req.body)
    res.json(data)
})
// resend otp 
router.get("/resend-otp", async (req, res) => {
    let data = await resendOtp(req.body)
    res.json(data)
})

router.get('/get-all-users', auth, checkRole(["1"]), async (req, res) => {
    let data = await getAllUser()
    res.json(data)
})

export default router