import express from 'express'
import { env } from './config/config.service.js'
import { databaseConnection } from './database/connection.js'
import authRouter from './module/auth/auth.controller.js'
const app = express()
databaseConnection()

app.use(express.json())
app.use("/auth", authRouter)

app.use((err, req, res, next) => {

    console.log(err.cause.status);
    let stack = env.mode == "dev" ? err.stack : null
    res.status(err.cause.status || 500).json({ message: err.message, stack })
})
app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`)) 