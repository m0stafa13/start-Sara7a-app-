import argon2 from "argon2";
import { checkPassword, checkPasswordArg2, generateHash, generateHashArg2 } from "../../common/index.js"
import { env } from "../../config/config.service.js";
import { userModel } from "../../database/model/user.model.js";

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
        let hashedPassword = await generateHashArg2({ planText: password })
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
// argon 2 dose not want salt round 
// in bcrypt we send SALT round from .env file but in argon 2 do not salt round
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

        //check password with argon2
        let isMatch = await checkPasswordArg2({ planText: password, hashed: userData.password })
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