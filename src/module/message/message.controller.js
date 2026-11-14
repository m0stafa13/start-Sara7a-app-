import Router from "express"
import { createMessage, getAllMessage, getUserData, getUserMessages } from "./message.service.js"
import { successResponse } from "../../common/exception/index.js"
import { auth, checkRole, upload } from "../../common/middleware/index.js"
const router = Router()

// get all messages 
router.get("/get-all-messages", auth, checkRole(["1"]), async (req, res) => {
    let data = await getAllMessage()
    successResponse({
        res,
        data,
    }
    )
})
// create message 
router.post("/crate-message", upload().single("image"), async (req, res) => {
    let data = await createMessage(req.body, req.file)
    successResponse({
        status: 201,
        res, data
    })
})
// get user data for message
router.get("/user", async (req, res) => {
    let data = await getUserData(req.body)
    successResponse({
        res, data
    })
})

// get user messages 
router.get("/get-user-message", auth, async (req, res) => {
    let data = await getUserMessages(req.user)
    successResponse({ res, data, status: 200 })
})






export default router
