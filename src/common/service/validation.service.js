import { BadRequestException } from "../exception/error.exceptions.js"

export const validation = (schema) => {
    return (req, res, next) => {
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
