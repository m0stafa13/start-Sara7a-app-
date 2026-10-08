import jwt from "jsonwebtoken"
import { env } from "../../config/config.service.js"
// generate token 
export const generateToken = async (user) => {
    let signature
    let refreshSignature
    let role
    switch (user.role) {
        // admin case
        case "1":
            signature = env.adminSignature
            refreshSignature = env.adminRefreshSignature
            role = "admin"
            break;
        // user case
        default:
            signature = env.userSignature
            refreshSignature = env.userRefreshSignature
            role = "user"
            break;
    }
    const accessToken = jwt.sign({ email: user.email, id: user._id }, signature, { audience: role, expiresIn: "30min" })
    const refreshToken = jwt.sign({ email: user.email, id: user._id }, refreshSignature, { audience: role, expiresIn: "1y" })

    return {
        accessToken,
        refreshToken
    }

}


//  generate access token 

export const generateAccessTokenFromRefresh = async (refresh) => {
    let { aud } = jwt.decode(refresh)
    let refreshSignature
    let role
    let signature
    switch (aud) {
        case "admin":
            signature = env.adminSignature
            refreshSignature = env.adminRefreshSignature
            role = "admin"
            break;
        case "user":
            signature = env.userSignature
            refreshSignature = env.userRefreshSignature
            role = "user"
        default:
            break;
    }


    let decodedData = jwt.verify(refresh, refreshSignature)
    let newAccessToken = jwt.sign({ id: decodedData.id, email: decodedData.email }, signature, { audience: role, expiresIn: "30min" })
    return { newAccessToken }
}