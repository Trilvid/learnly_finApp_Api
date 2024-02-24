import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerConfig: MailerOptions = {
    transport: {
        // host: "smtp.resend.com",
        host: "smtp-mail.outlook.com",
        // port: 2587,
        port: 587,
        secure: true,
        // tls: {
        //     ciphers:'SSLv2'
        // },
        tls:{
            rejectUnauthorized: false
       },
        auth: {
            // user: "resend",
            user: "divinennanna.20201239483@futo.edu.ng",
            // pass: process.env.RESEND_API_KEY
            pass: "@Candbf1cd9"
        }
    },
    defaults: {
        from: '"No Reply" <no-reply@learnlyApp>'
    }
}
