const nodemailer = require("nodemailer")
const CustomAPIError = require('../errors/CustomError')

const sendEmail = async(email , subject , link)=>{
    try {
        
        const transporter =nodemailer.createTransport({
            service :  process.env.EMAIL_SERVICE,
            host :  process.env.EMAIL_HOST,
            port : 587,
            secure : true,
            auth: {
                user : process.env.EMAIL_USER ,//sender email address
                pass : process.env.EMAIL_PASS  // app paasword fro gmail
            },
        })

        const mailOptions = {
            from : {
                name : "EcoEngage",
                address : process.env.EMAIL_USER
            },
            to : email,
            subject : subject,
            text : `Here is your password reset link .
             ${link} 
             The link will expire in ${process.env.FORGET_PASSWORD_JWT_LIFETIME}
            `, // plain text body
        }

        await transporter.sendMail(mailOptions)
        console.log('in send mail');

    } catch (error) {
        throw new CustomAPIError('Something went wrong while sending email',500);
    }
}

module.exports = sendEmail