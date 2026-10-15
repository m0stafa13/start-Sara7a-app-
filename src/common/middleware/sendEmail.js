import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mosmahmoud080@gmail.com",
        pass: "hsra xdhm kjzj hfcf"
    }
})



export const sendEmail = ({ to, subject, html }) => {
    transporter.sendMail({
        from: "sara7a@gmail.com",
        to,
        subject,
        html
    })
    console.log("email send");
}
