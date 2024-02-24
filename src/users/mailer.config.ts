import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerConfig: MailerOptions = {
    transport: {
        host: "smtp.resend.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    },
    defaults: {
        from: '"No Reply" <no-reply@learnlyApp>'
    }
}
