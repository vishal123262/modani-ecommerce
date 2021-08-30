require ('dotenv').config();

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeEmail = (email , name) => {
    sgMail.send({
        to:email,
        from:'vishalmodani647@gmail.com',
        subject:'Thanks for joining in',
        text:`Welcome to the app. ${name} . Let me know how you get along the app!`
    })
 }
 git 
module.exports = {
    sendWelcomeEmail
}
