import jwt from "jsonwebtoken"

// generate token 
export const generateToken = async ({ email, id }) => {
    let token = await jwt.sign({ email, id }, "hello")
    return token
}
// convert token 
export const auth = async (req, res, next) => {
    let decodedToken = await jwt.verify(req.headers.token, "hello")
    req.userToken = decodedToken
    next()
}