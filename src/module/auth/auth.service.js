import argon2 from "argon2";
import { checkPassword, checkPasswordArg2, generateHash, generateHashArg2 } from "../../common/index.js"
import { userModel } from "../../database/model/user.model.js";
import { BadRequestException, ConflictException, ErrorResponse, NotFoundException } from "../../common/exception/error.exceptions.js";
import jwt from "jsonwebtoken"
import { generateToken } from "../../common/index.js";
// sign up 
export const signUp = async (body) => {
    let { name, email, password, age, confirmPassword } = body
    if (password != confirmPassword) {
        return BadRequestException({ message: "Confirm password must be match with password" })
    }
    let userExists = await userModel.findOne({ email })
    if (userExists) {
        return ConflictException({ message: "user already exists" })
    } else {                                      // sault round    when you up this salt will make responsive bad
        let hashedPassword = await generateHash({ planText: password })
        if (hashedPassword) {
            let addUser = await userModel.create({ name, email, password: hashedPassword, age })
            if (addUser) {
                return {
                    message: "user added successfully",
                    user: addUser
                }
            } else {
                return BadRequestException({ message: "Something went wrong" })
            }
        } else {
            return BadRequestException({ message: "Try again" })
        }
    }
}
// argon 2 dose not want salt round 
// in bcrypt we send SALT round from .env file but in argon 2 do not salt round
// sign in  
export const signIn = async (body) => {
    let { email, password } = body
    let userData = await userModel.findOne({ email })
    if (!userData) {
        return NotFoundException({ message: "user emile is not found" })
    }
    //check password with argon2
    let isMatch = await checkPassword({ planText: password, hashed: userData.password })
    if (isMatch) {
        // generate token 
        let { accessToken } = await generateToken(userData)


        return {
            message: "login successfully",
            token: accessToken
        }
    } else {
        return BadRequestException({ message: "incorrect password" })
    }
}
// get user by id 
export const getUserById = async (data) => {
    let { id } = data
    let findUser = await userModel.findById(id)
    if (findUser) {
        return {
            message: "user found successfully",
            user: findUser
        }
    }
    return BadRequestException({ message: "user not found" })
}