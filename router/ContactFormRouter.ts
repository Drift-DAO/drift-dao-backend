import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';

const ContactFormRouter = express.Router();

// code to send mails to the team when someone fills up the contact form on the website
ContactFormRouter.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // create reusable transporter object using the default SMTP transporttransport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'deependujha21@gmail.com', // sender's email address
                pass: process.env.NODE_MAILER_PASSWORD, // password generated by google for a custom app ->  https://security.google.com/settings/security/apppasswords
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Drift-DAO 🚀🔥" drift-dao@gmail.com', // sender address
            to: 'deependujha16@gmail.com, nkumar35101@gmail.com', // list of receivers
            subject: `Woohoo, ${name} filled the contact form @Drift-DAO`, // Subject line
            text: `Woohoo... ${name} - ${email} sent the message: ${message}`, // plain text body
            html: `<b>Woohoo..</b><p>${name} filled the form @Drift-DAO.</p><p><b>Name</b>:<b>${name}</b></p><p><b>Email</b>:<b>${email}</b></p><p><b>Message</b>:<b>${message}</b></p><br><i>Drift-DAO will go beyond the moon 🚀🔥<i/>`, // html body
        });
        // console.log('email sent successfully');
        res.send('Email sent successfully');
    } catch (e) {
        // console.log(`error occurred: ${e}`);
        res.send(`error occurred: ${e}`);
    }
});

export default ContactFormRouter;