const nodemailer = require('nodemailer')

const sendEmail = async (option)=>
{

    //Create a Transporter
    const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
            }
          

    })

    //DEFINE EMAIL OPTIONS
    const emailOptions =
    {
        from: 'MananJain',
        to: option.email,
        subject: option.subject,
        text:option.message
    }
   await transporter.sendMail()

}

module.exports = sendEmail