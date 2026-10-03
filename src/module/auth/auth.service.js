import { env } from "../../config/config.service.js";
import { userModel } from "../../database/model/user.model.js";
import bcrypt from "bcrypt"


export const signUp = async (body) => {
    let { name, email, password, age, confirmPassword } = body
    if (password != confirmPassword) {
        return {
            message: "confirm password is not match the password"
        }
    } else {

    }
    let userExists = await userModel.findOne({ email })
    if (userExists) {
        return {
            message: "user already exists"
        }
    } else {
        let hashedPassword = await bcrypt.hash(password, Number(env.saltRound))
        if (hashedPassword) {
            let addUser = await userModel.create({ name, email, password: hashedPassword, age })
            if (addUser) {
                return {
                    message: "user added successfully",
                    user: addUser
                }
            } else {
                return {
                    message: "something went wrong"
                }
            }
        } else {
            return {
                message: "something went wrong in hashing operate"
            }
        }
    }
}
