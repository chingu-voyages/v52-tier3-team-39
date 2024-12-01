import nodemailer from "nodemailer";
import { mockEmailPass, mockEmailUser } from "../config/env.js";
import { convertTimeRange } from "./dateTimeHelper.js";

const MOCK_EMAIL_ADDRESS = "nxtwd4cqgh2i3sze@ethereal.email";

export const apptRequestEmailText = (formData) => {
  const timeRange = convertTimeRange(
    formData.earlyTimeHour,
    formData.lateTimeHour
  );

  return `Hi ${formData.name}. Thank you for scheduling an appointment with us! We’ve received your request for an appointment between ${timeRange.early} and ${timeRange.late} at ${formData.address}. Please note the date and time have not yet been finalized. We’ll confirm these details and notify you the night before your visit. If you have any questions or need assistance, feel free to contact us. We look forward to seeing you soon! Best regards, RayVolution.`;
};

export const apptConfirmationEmailText = (apptData) => {
  const timeRange = convertTimeRange(
    apptData.confirmedAppointmentDetails.confirmedEarlyTime,
    apptData.confirmedAppointmentDetails.confirmedLateTime
  );

  return `Hi ${apptData.name}. Your appointment has been confirmed! We’re pleased to let you know that your appointment is scheduled for: Date: ${apptData.confirmedAppointmentDetails.confirmedDate}. Time: ${timeRange.early} - ${timeRange.late}. If you have any questions or need to reschedule, please don’t hesitate to contact us. We look forward to seeing you! Best regards, RayVolution.`;
};

export const apptRequestEmailHtml = (apptData) => {
  const timeRange = convertTimeRange(
    apptData.confirmedAppointmentDetails.confirmedEarlyTime,
    apptData.confirmedAppointmentDetails.confirmedLateTime
  );

  return `
    <div>
      <div>
        <h1>RayVolution</h1>
      </div>
      <div>
        <h2>Your Appointment Has Been Scheduled</h2>
      </div>
      <div>
        <p>Hi ${apptData.name},</p>
        <p>Your appointment has been confirmed!</p>
        <p>We’re pleased to let you know that your appointment is scheduled for:</p>
        <p>Date: ${apptData.confirmedAppointmentDetails.confirmedDate}</p>
        <p>Time: ${timeRange.early} - ${timeRange.late}</p>
        <p>If you have any questions or need to reschedule, please don’t hesitate to contact us.</p> 
        <p>We look forward to seeing you!</p>
        <p>Best regards,<br>RayVolution</p>
      </div>
    </div>
  `;
};

export const apptConfirmationEmailHtml = (formData) => {
  const timeRange = convertTimeRange(
    formData.earlyTimeHour,
    formData.lateTimeHour
  );

  return `
    <div>
      <div>
        <h1>RayVolution</h1>
      </div>
      <div>
        <h2>Your Appointment Request</h2>
      </div>
      <div>
        <p>Hi ${formData.name},</p>
        <p>Thank you for scheduling an appointment with us!</p>
        <p>
          We’ve received your request for an appointment between ${timeRange.early} and ${timeRange.late} at ${formData.address}. Please note the date and time have not yet been finalized. We’ll confirm these details and notify you the night before your visit.
        </p>
        <p>If you have any questions or need assistance, feel free to contact us.</p><p>We look forward to seeing you soon!</p>
        <p>Best regards,<br>RayVolution</p>
      </div>
    </div>
  `;
};

const sendEmail = async ({ toAddress, subject, text, html }) => {
  try {
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
      from: "Sender Name " + MOCK_EMAIL_ADDRESS,
      to: `Recipient ${toAddress}`,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(message);
    return nodemailer.getTestMessageUrl(result);
  } catch (error) {
    console.log(error.message);
    return next({ message: "Error sending mock email" });
  }
};

export default sendEmail;
