import { BadRequestException, NotFoundException } from "../../common/exception/error.exceptions.js"
import { messageModel } from "../../database/model/message.model.js"
import { userModel } from "../../database/model/user.model.js"
// get all message for admin only 
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
// create message and send 

export const createMessage = async (body, file) => {
    let { content, receiverId } = body
    let image
    let checkReceiver = await userModel.findOne({ _id: receiverId })
    if (!checkReceiver) {
        return BadRequestException({ message: "user not found" })
    }
    if (file) {
        image = file.path
    }
    let addedMessage = await messageModel.create({ receiverId, content, image })
    if (!addedMessage) {
        return BadRequestException({ message: "message not send" })
    }
    return { message: "message sent successfully" }
}

// get user data
export const getUserData = async (body) => {
    let { url } = body
    let uniqueName = url.split("/").at(-1)
    let userData = await userModel.findOne({ uniqueName })
    if (!userData) return NotFoundException({ message: "user not found" })
    return userData
}

//get User Messages
export const getUserMessages = async (user) => {
    let { id } = user
    let messages = await messageModel.find({ receiverId: id })
    if (!messages.length > 0) {
        return NotFoundException({ message: "no message found" })
    }
    return messages
}