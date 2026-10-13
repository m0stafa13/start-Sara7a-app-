import z from "zod"
export const userLoginSchema = z.object({
    email: z.email(),
    password: z.string().max(20).min(5)
})