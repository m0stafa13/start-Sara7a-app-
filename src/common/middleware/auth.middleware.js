import jwt from "jsonwebtoken"
import { env } from "../../config/config.service.js";
import { BadRequestException } from "../exception/error.exceptions.js";

export const auth = async (req, res, next) => {
    let [flag, token] = req.headers.authorization.split(" ")

    switch (flag) {
        case "Basic":
            // we will not work with basic method because you but password as data in token
            let basicToken = Buffer.from(token, "base64").toString()
            //  req.user = basicToken
            console.log(basicToken);
            break;
        //!convert and verify bearer token
        case "Bearer":
            let { aud } = jwt.decode(token)
            let signature
            switch (aud) {
                case "admin":
                    //admin case
                    signature = env.adminSignature
                    break;
                case "user":
                    // user case
                    signature = env.userSignature
                    break;
            }
            // decode verify using signature that checked from aud (user , admin)
            let decodedData = jwt.verify(token, signature)
            if (decodedData) {
                req.user = decodedData
                next()
            }
            else {
                return BadRequestException({ message: "invalid token" })
            }
            break
        default:
            break;
    }

}

