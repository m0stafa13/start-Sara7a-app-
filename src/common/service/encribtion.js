import bcrypt from "bcrypt"
import * as argon2 from "argon2"
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
//! work with argon2 
// dose not want to salt round
export const generateHashArg2 = async ({ planText }) => {
    let encData = await argon2.hash(planText)
    return encData  
}
// function to check password from front and from back
export const checkPasswordArg2 = async ({ planText, hashed }) => {
    // hashed first then planTest
    let result = await argon2.verify(hashed, planText)
    return result
}