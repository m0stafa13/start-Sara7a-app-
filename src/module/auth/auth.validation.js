import z, { date } from "zod"
import { GenderEnum } from "../../common/index.js"

export const userLoginSchema = z.strictObject({
    email: z.email({ error: "this email is not correct" }),
    password: z.string().max(20).min(5)
})//.catchall(z.number)

//! extend vs safeExtend
// extend ==> we cans extend from another schema and override on it's validation 
// safeExtend ==> we extend the values and cannot override on ti's validation and we extend the refine and superRefine also

export const userSignupSchema = userLoginSchema.extend({
    name: z.string().includes(" ").min(3).max(50),
    age: z.coerce.number(),
    gender: z.enum(GenderEnum),
    dateOfBirth: z.string(),
    confirmPassword: z.string().max(20).min(5)
}).superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
        ctx.addIssue({
            code: "custom",
            path: ["confirm password"],
            message: "Password do not match confirm password"
        })
    }
    if (data.age < 18 || data.age > 60) {
        ctx.addIssue({
            code: "custom",
            path: ["age"],
            message: "age is not valid"
        })
    }
})


//.refine((value) => {
//     return value.password === value.confirmPassword
// }, {
//     message: "confirm password is not match password"
// })
//! refine vs superRefine
//  refine ==> works with only one condition
// superRefine ==> can work with multi conditions

