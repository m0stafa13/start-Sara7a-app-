import mongoose from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/index.js";


// create user schema 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, age: {
        type: Number
    },
    gender: {
        type: String,
        enum: GenderEnum,
        default: GenderEnum.Male
    },
    role: {
        type: String,
        enum: RoleEnum,
        default: RoleEnum.User
    },
    provider: {
        type: String,
        enum: ProviderEnum,
        default: ProviderEnum.System
    },
    profileImage: {
        type: String
    },
    coverImage: {
        type: [String],
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const userModel = mongoose.model("user", userSchema)