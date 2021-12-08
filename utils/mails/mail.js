import nodemailer from 'nodemailer'
import  dotenv from 'dotenv'

dotenv.config()


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER ,
    port: process.env.EMAIL_PORT,
    auth: {
        user:  process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: { secureProtocol: "TLSv1_method", rejectUnauthorized: false }
});



const sendMail = async ( to ,subject, text ) => {
      let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: subject,
        html: text
      };
      await transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log(data)
          console.log("Email sent successfully");
        }
      });
}

export default sendMail

