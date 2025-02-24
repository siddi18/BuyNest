
// const sendEmail = async options => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   })

//   const mailOptions = {
//     from: "Siddhi R <crazythoughts1729@gmail.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     //html:
//   }

//   await transporter.sendMail(mailOptions)
// }

// export default sendEmail

import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT, // 587 for TLS
      secure: false, // false for TLS (port 587), true for SSL (port 465)
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Helps avoid SSL issues
      },
    });

    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USERNAME}>`, // Sender
      to: options.email, // Recipient
      subject: options.subject, // Subject
      text: options.message, // Plain text email
      html: `<p>${options.message}</p>`, // HTML version (optional)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.response);
  } catch (error) {
    console.error("❌ Error sending email: ", error);
  }
};

export default sendEmail;
