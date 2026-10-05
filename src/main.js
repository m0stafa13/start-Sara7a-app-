import express from 'express'
import { env } from './config/config.service.js'
import { databaseConnection } from './database/connection.js'
import authRouter from './module/auth/auth.controller.js'
const app = express()
databaseConnection()

app.use(express.json())
app.use("/auth", authRouter)

app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`)) 