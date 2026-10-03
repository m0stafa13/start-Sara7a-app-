import express from 'express'
import { env } from './config/config.service.js'
import { databaseConnection } from './database/connection.js'
import { userModel } from './database/model/user.model.js'
const app = express()
databaseConnection()




app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`))