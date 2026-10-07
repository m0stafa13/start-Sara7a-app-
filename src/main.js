import express from 'express'
import { env } from './config/config.service.js'
import { databaseConnection } from './database/connection.js'
import authRouter from './module/auth/auth.controller.js'
const app = express()
databaseConnection()

app.use(express.json())
app.use("/auth", authRouter)

app.use((err, req, res, next) => {
    // stack from error will describe error details for developer
    let stack = env.mode == "dev" ? err.stack : null
    const status = err.cause ? err.cause.status : 500
    res.status(status).json({
        message: err.message, stack
    })
})
app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`)) 