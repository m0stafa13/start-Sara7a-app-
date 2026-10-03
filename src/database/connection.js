// database connection 
import mongoose from "mongoose"
import { env } from "../config/config.service.js"


export const databaseConnection = async () => {
    mongoose.connect(env.uri).then(() => {
        console.log("database connected successfully");
    }).catch((e) => {
        console.log("something went wrong in db connection..", e);
    })
}