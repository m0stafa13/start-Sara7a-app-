import { getUserById } from "../../module/auth/auth.service.js"
import { UnAuthorizedException } from "../exception/error.exceptions.js"

export const checkRole = (role) => {
    return async (req, res, next) => {
        // reading data from get user by id not findOne()
        let userData = await getUserById(req.user)
        if (!userData.user.role.includes(role)) {
            throw UnAuthorizedException({ message: "You are not authorize to access this api" })
        }
        next()
    }
}