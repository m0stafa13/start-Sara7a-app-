import bcrypt from "bcrypt"
import { env } from "../../config/config.service.js"
export const generateHash = async ({ planText, salt = env.saltRound }) => {
    let encData = await bcrypt.hash(planText, Number(salt))
    return encData
}

// function to check password from front and from back

export const checkPassword = async ({ planText, hashed }) => {
    let result = await bcrypt.compare(planText, hashed)
    return result
}