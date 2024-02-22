// import { MailerOptions } from '@nestjs-modules/mailer';

// export const mailerConfig: MailerOptions = {
//     transport: {
//         host: "smtp.resend.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: "resend",
//             pass: "re_idi7KPU5_K9fQa4JF2g4F5o1ZSXTGemyY"
//             // re_idi7KPU5_K9fQa4JF2g4F5o1ZSXTGemyY
//         }
//     },
//     defaults: {
//         from: '"No Reply" <no-reply@learnlyApp>'
//     }
// }
// import nodemailer from 'nodemailer';

// async function main() {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.resend.com',
//     secure: true,
//     port: 465,
//     auth: {
//       user: 'resend',
//       pass: 're_123456789',
//     },
//   });

//   const info = await transporter.sendMail({
//     from: 'onboarding@resend.dev',
//     to: 'delivered@resend.dev',
//     subject: 'Hello World',
//     html: '<strong>It works!</strong>',
//   });

//   console.log('Message sent: %s', info.messageId);
// }

// main().catch(console.error);

import { MailerOptions } from '@nestjs-modules/mailer';

export const mailerConfig: MailerOptions = {
    transport: {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
            user: "7ed56c75a1edec",
            pass: "8aa2d606552c46"
        }
    },
    defaults: {
        from: '"No Reply" <no-reply@learnlyApp>'
    }
}
