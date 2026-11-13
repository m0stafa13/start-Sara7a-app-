import { NotFoundException } from "../../common/exception/error.exceptions.js"
import { messageModel } from "../../database/model/message.model.js"

export const getAllMessage = async () => {
    let messages = await messageModel.find()
    if (!messages.length == 0) {
        return NotFoundException({ message: "No message found" })
    }
    return {
        message: "Message found successfully",
        messages
    }
}