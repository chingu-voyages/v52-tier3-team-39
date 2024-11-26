import nodemailer from "nodemailer";
import { mockEmailPass, mockEmailUser } from "../config/env.js";

const emailHelper = (email, earlyTime, lateTime) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: mockEmailUser,
      pass: mockEmailPass,
    },
  });

  const message = {
    from: "Sender Name donotreply.rayvolution.com",
    to: `Recipient ${email}`,
    subject: "Appointment Request Confirmation",
    text: `Your preferred time range is ${earlyTime} to ${lateTime}`,
    html: `<p><b>Hello ${email}</b>, your preferred time range is ${earlyTime} to ${lateTime}`,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

export default emailHelper;
