const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter for sending emails using Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use any email service provider
    auth: {
        user: process.env.EMAIL_USER, // Replace with your email
        pass: process.env.EMAIL_PASS   // Replace with your email password or an app password if using Gmail
    }
});

// Utility function to send emails
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

module.exports = sendEmail;
