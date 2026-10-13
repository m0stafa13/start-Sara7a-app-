import { BadRequestException } from "../exception/error.exceptions.js"

export const validation = (schema) => {
    return (req, res, next) => {
        let { success, error } = schema.safeParse(req.body)
        if (!success) {
            let extra = error.issues[0].message ? error.issues[0].message : "invalid data"
            return BadRequestException({ message: "invalid data", extra })
        }
        next()
    }
}
