import { checkPassword, checkPasswordArg2, generateAccessTokenFromRefresh, generateHash, generateHashArg2 } from "../../common/index.js"
import { userModel } from "../../database/model/user.model.js";
import { BadRequestException, ConflictException, ErrorResponse, NotFoundException } from "../../common/exception/error.exceptions.js";
import { generateToken } from "../../common/index.js";
import { sendEmail } from "../../common/middleware/sendEmail.js";
// sign up 
export const signUp = async (body, file) => {
    let profileImage;
    if (file) {
        profileImage = file.path
        console.log(profileImage);


    }

    let { name, email, password, age, confirmPassword, gender, dateOfBirth } = body
    if (password != confirmPassword) {
        return BadRequestException({ message: "Confirm password must be match with password" })
    }
    let userExists = await userModel.findOne({ email })
    if (userExists) {
        return ConflictException({ message: "user already exists" })
    } else {                                      // sault round    when you up this salt will make responsive bad
        let hashedPassword = await generateHash({ planText: password })
        if (hashedPassword) {
            let otp = Math.round(Math.random() * 1000000)
            // adding user to db 
            let addUser = await userModel.create({ name, email, password: hashedPassword, age, gender, dateOfBirth, otp, profileImage })
            // sent otp to user to verify account 
            sendEmail({ to: email, subject: "sign up", html: `<h1> your otp is ${otp}</h1>` })
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
    if (!userData.isVerified) {
        return BadRequestException({ message: "user is not verified cannot login" })
    }
    //check password with argon2
    let isMatch = await checkPassword({ planText: password, hashed: userData.password })
    if (isMatch) {
        // generate token 
        let { accessToken, refreshToken } = await generateToken(userData)
        return {
            message: "login successfully",
            token: accessToken,
            ref: refreshToken
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
// generate access token 
export const generateAccessToken = async (body) => {
    let { refreshToken } = body
    let { newAccessToken } = await generateAccessTokenFromRefresh(refreshToken)
    if (newAccessToken) {
        return {
            accessToken: newAccessToken
        }
    } else {
        return BadRequestException({ message: "invalid token" })
    }
}
// verify account using otp 
export const verifyAccount = async (body) => {
    let { email, otp } = body
    let userData = await userModel.find({ email })
    if (!userData[0]) {
        throw NotFoundException({ message: "user not found" })
    }
    if (userData[0].isVerified) {
        throw BadRequestException({ message: "user already verified" })
    }
    if (userData[0].otp == otp) {
        userData[0].isVerified = true
        userData[0].otp = null
        await userData[0].save()
        return userData
    } else {
        throw BadRequestException({ message: "otp is not match" })
    }
}
// resend otp  to verify account
export const resendOtp = async (data) => {
    let { email } = data
    let userData = await userModel.findOne({ email })
    if (userData) {
        if (userData.isVerified) {
            return BadRequestException({ message: "user already verified" })
        }
        let otp = Math.round(Math.random() * 1000000)
        userData.otp = otp
        userData.save()
        sendEmail({ to: email, subject: `Resend otp from sara7a app`, html: `Your otp is ${otp}` })
        return {
            message: "OTP already sent on your email"
        }
    }
    return BadRequestException({ message: "user not found" })
}


// get all users for admin
export const getAllUser = async () => {
    let data = await userModel.find()
    if (data.length > 0) {
        return {
            message: "users fonded successfully",
            users: data
        }
    }
    return {
        message: 'no user founded'
    }
}