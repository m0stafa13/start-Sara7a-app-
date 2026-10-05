import { checkPassword, generateHash } from "../../common/index.js"
import { env } from "../../config/config.service.js";
import { userModel } from "../../database/model/user.model.js";
import bcrypt from "bcrypt"

// sign up 
export const signUp = async (body) => {
    let { name, email, password, age, confirmPassword } = body
    if (password != confirmPassword) {
        return {
            message: "confirm password is not match the password"
        }
    }
    let userExists = await userModel.findOne({ email })
    if (userExists) {
        return {
            message: "user already exists"
        }
    } else {                                      // sault round    when you up this salt will make responsive bad
        let hashedPassword = await generateHash({ planText: password, salt: env.saltRound })
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
// sign in  
export const signIn = async (body) => {
    try {
        let { email, password } = body
        let userData = await userModel.findOne({ email })
        if (!userData) {
            return {
                message: "email is not found"
            }
        }
        //check password
        let isMatch = await checkPassword({ planText: password, hashed: userData.password })
        if (isMatch) {
            return {
                message: "login successfully",
                user: userData
            }
        } else {
            return {
                result: "login field",
                message: "password is not match "
            }
        }
    } catch (error) {
        return {
            error: error.message,
            message: "put all data in correct way"
        }
    }
}