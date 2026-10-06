import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) })
let port = process.env.PORT
let uri = process.env.DB_URI
let saltRound = process.env.SALT_ROUND
let mode = process.env.MODE
export const env = {
    port,
    uri,
    saltRound,
    mode
}