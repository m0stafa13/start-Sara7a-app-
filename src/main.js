import express from 'express'
import { env } from './config/config.service.js'
import { databaseConnection } from './database/connection.js'
import authRouter from './module/auth/auth.controller.js'
import { fileURLToPath } from 'url';
import path from "path"
import { redisConnection } from './database/redis/index.js';

const app = express()
databaseConnection()
// client from redis connection 
export const client = await redisConnection()
// get file name using es6
const __filename = fileURLToPath(import.meta.url)
// get file directory using es6
const __direname = path.dirname(__filename)
// get upload folder path 
const uploadPath = path.resolve(__direname, "../uploads")


app.use(express.json())
app.use("/auth", authRouter)
// to return image to front as image same logic app.use("/auth" , authRouter) work like express.json()
app.use("/uploads", express.static(uploadPath))
app.use((err, req, res, next) => {
    // stack from error will describe error details for developer
    let status = err.cause ? err.cause.status : 500
    let stack = env.mode == "dev" ? err.stack : null
    const extra = err.cause ? err.cause.extra : null
    res.status(status).json({
        message: err.message,
        stack,
        extra
    })
})
app.listen(env.port, () => console.log(`Express app listening on port ${env.port}!`)) 