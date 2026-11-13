import Router from "express"
import { getAllMessage } from "./message.service.js"
const router = Router()


router.get("/get-all-messages", async (req, res) => {
    let data = await getAllMessage()
})




export default router
