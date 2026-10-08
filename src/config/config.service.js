import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) })
let port = process.env.PORT
let uri = process.env.DB_URI
let saltRound = process.env.SALT_ROUND
let mode = process.env.MODE
let userSignature = process.env.USER_SIGNATURE
let adminSignature = process.env.ADMIN_SIGNATURE
let adminRefreshSignature = process.env.ADMIN_REFRESH_SIGNATURE
let userRefreshSignature = process.env.USER_REFRESH_SIGNATURE

export const env = {
    port,
    uri,
    saltRound,
    mode,
    adminSignature,
    userSignature,
    adminRefreshSignature,
    userRefreshSignature
}