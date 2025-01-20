// import sgMail from '@sendgrid/mail';

// // Configure SendGrid
// sgMail.setApiKey(String (process.env.SENDGRID_API_KEY));

// // Function to send an email using a dynamic template
// export const sendMailBySendgrid = async (
//   to: string,
//   from: string,
//   templateId: string,
//   dynamicData: Record<string, string>
// ): Promise<void> => {
//   try {
//     const msg = {
//       to, // Recipient email address
//       from, // Sender email address (must be verified in SendGrid)
//       templateId, // The dynamic template ID
//       dynamicTemplateData: dynamicData, // Dynamic data to replace placeholders
//     };

//     // Send the email
//     const response = await sgMail.send(msg);
//     console.log('Email sent successfully:', response[0].statusCode);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };

import nodemailer from "nodemailer"

 const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.EMAIL_KEY
    }
})

export  const sendMail = (to:string, subject:string, html:any) => {
    mailer.sendMail({
        from: process.env.NODE_EMAIL,
        to: to,
        subject: subject,
        html:html
    })
}

