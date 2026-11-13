import Router from "express"
import { getAllMessage } from "./message.service.js"
import { successResponse } from "../../common/exception/index.js"
import { auth, checkRole } from "../../common/middleware/index.js"
const router = Router()


router.get("/get-all-messages", auth, checkRole(["1"]), async (req, res) => {
    let data = await getAllMessage()
    successResponse({
        res,
        data,
    }
    )
})




export default router
