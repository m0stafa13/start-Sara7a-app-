import nodemailer from "nodemailer";
import { env } from "../../config/config.service.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.mainEmail,
        pass: env.pass
    }
})



export const sendEmail = ({ to, subject, html }) => {
    transporter.sendMail({
        from: "sara7a@gmail.com",
        to,
        subject,
        html
    })
    console.log("email sent");

}
