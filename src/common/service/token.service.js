import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {

    let decodeData = jwt.verify(req.headers.token , "hello")
    console.log(decodeData);

    req.user = decodeData
    next()
}