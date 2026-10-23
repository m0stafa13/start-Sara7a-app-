import { BadRequestException } from "../exception/error.exceptions.js"

export const validation = (schema) => {
    return (req, res, next) => {
        if (req.body.gender) {
            let gender = req.body.gender
            gender = Number(gender)
            req.body.gender = gender
        }
        let { success, error, data } = schema.safeParse(req.body)
        if (!success) {
            console.log(error.issues);
            // let extra = error.issues[0].message ? error.issues[0].message : "invalid data"
            return BadRequestException({ message: "invalid data", extra: error.issues })
        } 
        req.data = data
        next()
    }
}
 