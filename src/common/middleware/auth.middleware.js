import jwt from "jsonwebtoken"


// convert token 
// export const auth = async (req, res, next) => {
//     let decodedToken = await jwt.verify(req.headers.token, "hello")
//     req.userToken = decodedToken
//     next()
// }
export const auth = async (req, res, next) => {
    let [flag, token] = req.headers.authorization.split(" ")


    switch (flag) {
        // we will not work with basic method because you but password as data in token
        case "Basic":
            const basicData = Buffer.from(token, "base64").toString()
            let [email, password] = basicData.split(":")
            console.log(email);
            break;
        case "Bearer":
            let decodedToken = jwt.decode(token)
            console.log(decodedToken);
            break



        default:
            break;
    }

}

