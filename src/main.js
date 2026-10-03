import express from 'express'
import { env } from './config/config.service.js'
const app = express()

console.log(env.port);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`))