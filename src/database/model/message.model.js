import mongoose, { Types } from "mongoose";


const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    receiverId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    image: {
        type: String,
        require: false
    }
}, {
    timestamps: true
})


export const messageModel = mongoose.model("message" , messageSchema)
