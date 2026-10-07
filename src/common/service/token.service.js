import jwt from "jsonwebtoken"
// generate token 
export const generateToken = async (user) => {
    let signature
    let role
    let refreshSignature
    switch (user.role) {
        case "1":
            signature = "AdminSignature"
            refreshSignature = "AdminRefreshSignature"
            role = "admin"
            break;
        default:
            signature = "UserSignature"
            refreshSignature = "UserRefreshSignature"
            role = "user"
    }
    const accessToken = jwt.sign({ email: user.email, id: user._id }, signature, { audience: role, expiresIn: '30min' })
    const refreshToken = jwt.sign({ email: user.email, id: user._id }, refreshSignature, { audience: role, expiresIn: '1y' })
    return { accessToken, refreshToken }
}